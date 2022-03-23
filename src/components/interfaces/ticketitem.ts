export interface TicketItem{
    id: number
    quantity: number | unknown
    product_name: string
    unit_price: number
    currency: string
    shipping_required: boolean
    total_price?: number
}