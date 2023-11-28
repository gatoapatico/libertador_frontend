import { useLocation } from "react-router-dom"

export default function Pago() {

    const location = useLocation();
    const { state } = location;

    return (
        <div className="contenedor-pago">
            <h1>Página de Pago de Reserva!</h1>
            <p>{JSON.stringify(state)}</p>
        </div>
    )
}