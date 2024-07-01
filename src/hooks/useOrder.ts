import {useState } from "react"
import type { MenuItem, OrderItem } from "../types"




export default function useOrder() {

    //hooks
    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)

    //const [total, setTotal] = useState(0)
    //const [auth, setAuth] = useState(false)


    //Es una funcion tipo flecha
    const addItem = (item: MenuItem) => {
        
        //Encuentra si un producto esta repetido
        const itemExist = order.find(orderItem=> orderItem.id === item.id)

        if (itemExist) {

            //.map para poder iterar (cambiar) en los array
            const updateOrder = order.map(orderItem=> orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1 } : orderItem)
            setOrder(updateOrder)

        } else {
            const newItem = {...item, quantity: 1} //aqui estamos contando las cantidades
            setOrder([...order, newItem])
        }
    } 

    //hooks
    //PARA ELIMINAR UN PRODUCTO
    const removeItem = (id: MenuItem['id']) => {

        setOrder(order.filter(item => item.id !==id))
        //console.log('Eliminando...', id)
    }

    //PARA GUARDAR LA ORDEN, los set asi se resetean
    const placeOrder = () => {
        
        setOrder([]) 
        setTip(0) 

    }





    //console.log(order)

    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}
