import { TicketItem } from '@fair/components/interfaces/ticketitem'
export interface ShoppingCartProps{
    loading: boolean
    updateCartItem: (item: TicketItem) => void
    addToCart: (item: TicketItem) => void
    getItems: () => void
    getCartTotal: () => number
    items: any
}