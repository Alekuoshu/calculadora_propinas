import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void
}

export default function OrderTotals({order, tip, placeOrder} : OrderTotalsProps) {

    const subtotalAmount = useMemo(() => order.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [order])
    const tipAmount = useMemo(() => subtotalAmount * tip, [subtotalAmount, tip])
    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [subtotalAmount, tipAmount])

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina:</h2>
        <p>Subtotal a pagar: {''}
            <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
        </p>

        <p>Propina: {''}
            <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>

        <p>Total a Pagar: {''}
            <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
      </div>

      <button className="bg-black hover:bg-black-200 w-full mt-10 p-3 text-white uppercase font-bold disabled:opacity-10"
        disabled={totalAmount === 0}
        onClick={placeOrder}
      >
        Guardar Orden
      </button>
    </>
  )
}
