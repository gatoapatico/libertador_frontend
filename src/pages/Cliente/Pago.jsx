import { useLocation, useNavigate } from "react-router-dom"
import { FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";

export default function Pago() {

    const DATE_FORMAT = "dddd d, mmmm yyyy";

    const navigate = useNavigate();

    const location = useLocation();
    const { state } = location;
    const { checkIn, checkOut, categoria } = state;
    
    const [tiempo, setTiempo] = useState(300);

    useEffect(() => {
        const interval = setInterval(() => {
            setTiempo(prevTiempo => prevTiempo > 0 ? prevTiempo - 1 : prevTiempo);
        }, 1000);

    }, []);

    function formatoTiempo(segundos) {
        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = segundos % 60;
        return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
    }

    if(tiempo === 0) {
        navigate("/reserva");
    }

    return (
        <div className="contenedor-pago">
            <div className="panel-temporizador">
                <div className="panel-info">
                    <div className="info">
                        <h3>Fecha de estancia</h3>
                        <p>{`${dateFormat(checkIn, DATE_FORMAT)} - ${dateFormat(checkOut, DATE_FORMAT)}`}</p>
                    </div>
                    <div className="info">
                        <h3>Total por estancia</h3>
                        <p>{`S/${(categoria.costoTotalCategoria + (categoria.costoTotalCategoria * 0.18)).toFixed(2)}`}</p>
                    </div>
                </div>
                <div className="temporizador">
                    <p><FaClock />Tiempo de reserva: {formatoTiempo(tiempo)}</p>
                </div>
            </div>
            <div className="panel-user">
                <div className="panel-categoria">
                    <h1>{categoria.nombre}</h1>
                    <img src={`images/rooms/${categoria.foto[0].nombre}`} alt={`Foto ${categoria.nombre}`} />
                    <div className="detalle-reserva">
                        <h2>DETALLE DE RESERVA</h2>
                        <div className="fechas">
                            <p><span>Ingreso:</span>{`${dateFormat(checkIn, DATE_FORMAT)}`}</p>
                            <p><span>Salida:</span>{`${dateFormat(checkOut, DATE_FORMAT)}`}</p>
                        </div>
                        <div className="precio">
                            <p>{categoria.nombre}<span>{categoria.precioCategoria.toFixed(2)}</span></p>
                            <p>Servicios<span>{categoria.costoServicios.toFixed(2)}</span></p>
                            <p>IGV(18%)<span>{(categoria.costoTotalCategoria * 0.18).toFixed(2)}</span></p>
                            <div className="total">
                                <p><span>Total:</span> S/{(categoria.costoTotalCategoria + (categoria.costoTotalCategoria * 0.18)).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-pago">
                    <div className="contenedor-form">
                        <h1>PROCESO DE PAGO</h1>
                        <form className="formulario-pago">
                            <div className="input-form mid">
                                <label htmlFor="">Nombre</label>
                                <input type="text" />
                            </div>
                            <div className="input-form mid">
                                <label htmlFor="">Apellidos</label>
                                <input type="text" />
                            </div>
                            <div className="input-form">
                                <label htmlFor="">Dirección de Correo Electrónico</label>
                                <input type="email" />
                            </div>
                            <button type="button" className="btn-pagar">PAGAR CON NIUBIZ</button>
                        </form>
                    </div>
                </div>

            </div>
            {/* <p>{JSON.stringify(state)}</p> */}
        </div>
    )
}