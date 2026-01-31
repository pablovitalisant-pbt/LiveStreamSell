function getCartRecoveryProtocol() {
  return {
    tags: {
      postPurchaseUpdate: {
        tag: "POST_PURCHASE_UPDATE",
        use: "confirmacion de pago, recibos o tracking",
        restriction: "sin contenido promocional ni up-selling",
        trigger: "webhook de Flow/PayPal/Mercado Pago",
      },
      confirmedEventUpdate: {
        tag: "CONFIRMED_EVENT_UPDATE",
        use: "notificar inicio de nuevo Live Shopping registrado",
      },
    },
    messagingWindow: {
      steps: [
        "T+0h: bienvenida con link de pago (reserva activa)",
        "T+20min: recordatorio de cortesia",
        "T+12h: recordatorio de carrito sin reserva",
        "T+23h: ultima oportunidad antes de cierre",
      ],
    },
    otn: {
      useCase: "contacto fuera de 24h por stock",
      button: "Avisame cuando haya stock",
      token: "token de un solo uso",
    },
  };
}

module.exports = { getCartRecoveryProtocol };
