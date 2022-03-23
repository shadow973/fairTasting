export interface PaymentIntent {
    customer: string,
    ephemeral_key: string,
    ephemeral_key_id: string,
    payment_intent_secret: string,
  }