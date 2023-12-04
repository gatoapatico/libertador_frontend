import { useLocation, useNavigate, useOutletContext } from "react-router-dom"
import { FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";

export default function Pago() {

    const [startDate, setStartDate, endDate, setEndDate, user, openLogin] = useOutletContext();

    const [tarjeta, setTarjeta] = useState("");
    const [isFailTarjeta, setIsFailTarjeta] = useState(false);

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

    function handlePago() {
        if(/^[0-9]{16}$/.test(tarjeta)){
            
            const reservaObjeto = {
                "usuario": {
                    "id": user.id
                },
                "fechaReserva": dateFormat(new Date(), "yyyy-mm-dd")
            }

            const habitacionLibre = categoria.habitaciones
                .filter(habitacion => !habitacion.fechasReservadas.includes(dateFormat(checkIn, "yyyy-mm-dd")))[0];

            fetch("http://localhost:8080/api/reservas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservaObjeto),
            })
            .then((res) => {
                if (!res.ok) {
                    console.log("Falló en el fetch de creacion de reserva!");
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {

                const detalleObjeto = {
                    "checkIn": dateFormat(checkIn, "yyyy-mm-dd"),
                    "chackOut": dateFormat(checkOut, "yyyy-mm-dd"),
                    "habitaciones": {
                        "id": habitacionLibre.id
                    },
                    "reserva": {
                        "id": data.idReserva
                    }
                }

                fetch("http://localhost:8080/api/detalles", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(detalleObjeto),
                })
                .then((res) => {
                    if (!res.ok) {
                        console.log("Falló en el fetch de creacion de detalle reserva!");
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    console.log("Creación de detalle reserva con exito!");

                    const objeto = {
                        "checkIn" : checkIn,
                        "checkOut" : checkOut,
                        "categoria" : {...categoria}
                    }
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate("/boleta-reserva", { state: objeto });

                })
                .catch((error) => {
                    console.error("Error:", error.message);
                });

            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
        }
        else {
            setIsFailTarjeta(true);
        }
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
                                <label htmlFor="txtNombre">Nombre</label>
                                <input readOnly id="txtNombre" type="text" value={user.nombre}/>
                            </div>
                            <div className="input-form mid">
                                <label htmlFor="txtApellido">Apellidos</label>
                                <input readOnly id="txtApellido" type="text" value={user.apellido}/>
                            </div>
                            <div className="input-form mid">
                                <label htmlFor="txtCorreo">Dirección de Correo Electrónico</label>
                                <input readOnly id="txtCorreo" type="text" value={user.email}/>
                            </div>
                            <div className="input-form mid">
                                <label htmlFor="txtDni">DNI</label>
                                <input readOnly id="txtDni" type="text" value={user.dni}/>
                            </div>
                            <div className="input-form">
                                <label htmlFor="txtTarjeta">Tarjeta de Crédito</label>
                                <input id="txtTarjeta" type="text" onChange={(e) => setTarjeta(e.target.value)}/>
                                { isFailTarjeta ? <p className="txt-fail">El formato de número de tarjeta es de 16 digitos!</p> : "" }
                            </div>
                            <button type="button" onClick={handlePago} className="btn-pagar">PAGAR CON NIUBIZ</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}