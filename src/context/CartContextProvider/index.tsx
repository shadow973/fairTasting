import React, { ReactNode, useEffect, useCallback, useContext, useMemo, useState } from 'react'
import { ShoppingCartProps } from '@fair/components/interfaces/shoppingcart'
import { TicketItem } from '@fair/components/interfaces/ticketitem'
export const CartContext = React.createContext<ShoppingCartProps | undefined>(undefined)

export function useCartContext(): ShoppingCartProps {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('No valid cart context. Did you forget to add CartContextProvider?')
    }
    return context
}

const CartContextProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState([])

    const updateCartItem = (item: TicketItem) => {
        const exists = items.find(e => e.id == item.id)
        if (exists) {
            setItems(items.map(d => d.id === item.id ? { ...d, quantity: item.quantity, total_price: (item.quantity * item.unit_price) } : d))
        } else {
            addToCart(item)
        }
    }
    const addToCart = (item: TicketItem) => {
        setItems([...items, item])
    }
    const getItems = () => {
       
    }

    const value = useMemo(() => ({
        updateCartItem,
        addToCart,
        getItems,
        items
    }), [
        updateCartItem,
        addToCart,
        getItems,
        items
    ])

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export default CartContextProvider