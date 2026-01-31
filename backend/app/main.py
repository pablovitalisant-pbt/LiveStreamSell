from datetime import datetime, timezone
import hashlib
import hmac
import os
import uuid
from typing import List
from fastapi import FastAPI, Header, HTTPException, Request
from pydantic import BaseModel, Field

app = FastAPI()


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


INVENTORY = [
    {"id": "uuid", "sku": "POL-ROJ-M", "name": "Polera Roja M", "stock": 15, "price": 15000}
]


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
    items = INVENTORY[offset : offset + limit]
    return items


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
    for item in payload.items:
        stock = next((p["stock"] for p in INVENTORY if p["sku"] == item.sku), 0)
        if stock < item.qty:
            raise HTTPException(status_code=400, detail="Sin stock")
    return {
        "order_id": str(uuid.uuid4()),
        "payment_url": "https://flow.cl/pay/...",
        "status": "pending",
    }
