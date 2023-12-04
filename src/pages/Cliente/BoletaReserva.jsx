import { useLocation } from "react-router-dom";

export default function BoletaReserva() {

    const location = useLocation();
    const { state } = location;
    const { checkIn, checkOut, categoria } = state;

    console.log(checkIn);
    console.log(checkOut);
    console.log(categoria);

    return (
        <div className="contenedor-boleta-reserva">
            <h1>Felicidades! Tu reserva se ha realizado con éxito!</h1>
        </div>
    )
}