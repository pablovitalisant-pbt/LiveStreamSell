from datetime import datetime, timezone
import hashlib
import hmac
import os
import uuid
from typing import List
from fastapi import FastAPI, Header, HTTPException, Request
from pydantic import BaseModel, Field
from sqlalchemy import Column, Integer, MetaData, String, Table, create_engine, select, update

app = FastAPI()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL) if DATABASE_URL else None
metadata = MetaData()
products_table = Table(
    "products",
    metadata,
    Column("sku", String, primary_key=True),
    Column("stock", Integer, nullable=False),
    Column("price", Integer, nullable=False),
)
orders_table = Table(
    "orders",
    metadata,
    Column("id", String, primary_key=True),
    Column("status", String, nullable=False),
)


@app.on_event("startup")
def startup():
    if engine is None:
        return
    metadata.create_all(engine)
    with engine.begin() as conn:
        existing = conn.execute(select(products_table.c.sku)).first()
        if not existing:
            conn.execute(
                products_table.insert().values(
                    sku="POL-ROJ-M", stock=15, price=15000
                )
            )


@app.get("/health")
def health():
    env = os.getenv("ENV", "local")
    timestamp = datetime.now(timezone.utc).isoformat()
    return {
        "ok": True,
        "service": "api",
        "env": env,
        "timestamp": timestamp,
        "status": "alive",
    }


def _verify_fb_signature(secret: str, body: bytes, signature: str) -> bool:
    if not secret or not signature or not signature.startswith("sha256="):
        return False
    digest = hmac.new(secret.encode("utf-8"), body, hashlib.sha256).hexdigest()
    expected = f"sha256={digest}"
    return hmac.compare_digest(expected, signature)


@app.post("/api/v1/webhooks/facebook")
async def facebook_webhook(
    request: Request, x_hub_signature_256: str | None = Header(default=None)
):
    body = await request.body()
    secret = os.getenv("FB_APP_SECRET", "")
    if not _verify_fb_signature(secret, body, x_hub_signature_256 or ""):
        raise HTTPException(status_code=403, detail="Invalid signature")
    return {"ok": True}


def _require_bearer(authorization: str | None) -> None:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")
    token = authorization.split(" ", 1)[1].strip()
    expected = os.getenv("AUTH_BEARER_TOKEN", "localtoken")
    if not token or token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/api/v1/inventory/products")
def get_inventory_products(
    tienda_id: str | None = None,
    limit: int = 50,
    offset: int = 0,
    authorization: str | None = Header(default=None),
):
    _require_bearer(authorization)
    if tienda_id is None:
        raise HTTPException(status_code=404, detail="tienda_id required")
    if engine is None:
        raise HTTPException(status_code=500, detail="Database not configured")
    with engine.begin() as conn:
        rows = conn.execute(
            select(
                products_table.c.sku,
                products_table.c.stock,
                products_table.c.price,
            )
            .offset(offset)
            .limit(limit)
        ).all()
    return [
        {
            "id": "uuid",
            "sku": row.sku,
            "name": "Polera Roja M",
            "stock": row.stock,
            "price": row.price,
        }
        for row in rows
    ]


class OrderItem(BaseModel):
    sku: str
    qty: int = Field(gt=0)


class OrderCreate(BaseModel):
    tienda_id: str
    customer_fb_id: str
    items: List[OrderItem]
    gateway: str


@app.post("/api/v1/orders/create", status_code=201)
def create_order(
    payload: OrderCreate,
    authorization: str | None = Header(default=None),
    x_api_key: str | None = Header(default=None),
):
    if authorization:
        _require_bearer(authorization)
    else:
        expected_key = os.getenv("API_INTERNAL_KEY", "localkey")
        if not x_api_key or x_api_key != expected_key:
            raise HTTPException(status_code=401, detail="Unauthorized")
    if engine is None:
        raise HTTPException(status_code=500, detail="Database not configured")
    with engine.begin() as conn:
        for item in payload.items:
            row = conn.execute(
                select(products_table.c.stock).where(
                    products_table.c.sku == item.sku
                )
            ).first()
            stock = row.stock if row else 0
            if stock < item.qty:
                raise HTTPException(status_code=400, detail="Sin stock")
        for item in payload.items:
            conn.execute(
                update(products_table)
                .where(products_table.c.sku == item.sku)
                .values(stock=products_table.c.stock - item.qty)
            )
        order_id = str(uuid.uuid4())
        conn.execute(orders_table.insert().values(id=order_id, status="pending"))
    return {
        "order_id": order_id,
        "payment_url": "https://flow.cl/pay/...",
        "status": "pending",
    }
