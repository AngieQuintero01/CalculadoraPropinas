import { useMemo, useState } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
import Modal from 'react-modal';

Modal.setAppElement('#root');

//Definimos lo valores que arroja cada variable
type OrderTotalsProps = {
    order: OrderItem[],
    tip : number
    placeOrder: () => void

}

export default function OrderTotals({order, tip, placeOrder} : OrderTotalsProps) {

     const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el modal está abierto

    //Nueva funcion para el subtotal
    const subTotalAmount = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    //Funcion para las propinas
    const tipAmount = useMemo(() => subTotalAmount * tip, [tip, order])

    //Funcion para las propinas
    const TotalAmount = useMemo(() => subTotalAmount + tipAmount, [tip, order])

    //Funciones del modal
    const openModal = () => {
      setIsOpen(true); // Función para abrir el modal
    };
  
    const closeModal = () => {
      setIsOpen(false); // Función para cerrar el modal
    };
  
    const handleSaveOrder = () => {
      placeOrder(); // Lógica para guardar la orden (supongo que deberías definir esta función)
      closeModal(); // Cerrar el modal después de guardar la orden
    };
    

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y propina:</h2>
        <p>Subtotal a pagar: {''}

            <span className="font-bold"> {formatCurrency(subTotalAmount)}</span>

        </p>

        <p>Propina: {''}

          <span className="font-bold">{formatCurrency(tipAmount)}</span>

        </p>

        <p>Total a pagar: {''}

          <span className="font-bold">{formatCurrency(TotalAmount)}</span>

        </p>

      </div>

      <button 
        className="w-full bg-black p-3 text-white font-bold mt-10 
        disabled:opacity-10" 
        disabled={TotalAmount === 0}
        onClick={openModal}
      > 

        Guardar Orden
      </button>
      <Modal className=" border-spacing-1 w-50 mt-96 h-96 text-center bg-slate-50" 
        isOpen={isOpen} // Estado que controla si el modal está abierto o cerrado
        onRequestClose={closeModal} // Función para cerrar el modal (p. ej., al presionar fuera del modal)
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-content">
          <p >
            ¿Seguro que deseas gardar la orden?
          </p>
          <button className="w-50 bg-violet-800 p-3 text-white font-bold mt-10 
        disabled:opacity-10"onClick={handleSaveOrder}>Guardar Orden</button>
          <button onClick={closeModal}></button>
        </div>
      </Modal>

    </>
  )
}
