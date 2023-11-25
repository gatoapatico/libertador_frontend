import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/popups/Login";
import Registro from "../components/popups/Registro";
import { nanoid } from "nanoid";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


export default function Reserva() {

    const [categorias, setCategorias] = useState([]);
    const [isCalendar, setIsCalendar] = useState(false);

    function handleCalendar() {
        setIsCalendar(prevValue => !prevValue);
    }

    useEffect(() => {

        async function getCategoriasByHabitaciones() {
            const res = await fetch('http://localhost:8080/api/habitaciones/disponibles?fechaCheckIn=2023-11-21&fechaCheckOut=2023-11-30');
            const data = await res.json();

            const indexCategorias = data
                .filter(habitacion => habitacion.disponibilidad === "Disponible")
                .map(habitacion => habitacion.tipoHabitacion.id);

            const arrayIndexCategorias = [...new Set(indexCategorias)];
            seteoDeCategorias(arrayIndexCategorias);
        }

        async function seteoDeCategorias(arrayIndexCategorias) {
            const res = await fetch('http://localhost:8080/api/categorias');
            const data = await res.json();

            const categoriasDisponibles = data.filter(categoria => arrayIndexCategorias.includes(categoria.id));
            setCategorias(categoriasDisponibles);
        }

        getCategoriasByHabitaciones();
        
    }, []);

    const categoriasEl = categorias.map(categoria => {

        const serviciosEl = categoria.servicios.map(servicio => {
            return (
                <li key={nanoid()}>{servicio.nombre}</li>
            )
        })

        return (
            <div key={nanoid()} className="habitacion">
                <div className="habitacion-imagen">
                    <img src={`images/rooms/${categoria.foto}`} alt={`foto ${categoria.nombre}`} />
                </div>
                <div className="habitacion-info">
                    <h3>{categoria.nombre}</h3>
                    <h4 className="descripcion">{categoria.descripcion_breve}</h4>
                    <p className="habtc-disponibles">Solo quedan 2 habitaciones</p>
                    <ul>
                        {serviciosEl}
                    </ul>
                    <button className="btn-detalles">Detalles de la habitación</button>
                    <div className="reserva-info">
                        <div className="info-adicional">
                            <button className="btn-terminos">Términos y condiciones</button>
                            <h4><i className="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                        </div>
                        <div className="precio-reserva">
                            <h1>S/{categoria.precioCategoria.toFixed(2)}</h1>
                            <p>Por noche</p>
                            <p>Impuestos y tasas excluidos</p>
                            <button className="btn-reservar">RESERVAR AHORA</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    });


    return (
        <div className="contenedor-reservas">
            <div className="main-reservas">
                {/* <header className="header">
                    <Link to={"/"}><img className="logo" src="images/libertador_logo.png" alt="Libertador Logo" /></Link>
                    <nav className="navbar">
                        <ul>
                            <li>Mis reservas</li>
                            <li><button className="btn-login"><i className="bi bi-person-fill"></i>INICIAR SESIÓN</button></li>
                        </ul>
                    </nav>
                </header> */}
                <main className="reservas-container">
                    <div className="reservas-user">
                        <div className="inputs-user">
                            <div className="input">
                                <i className="bi bi-person-standing"></i>
                                <div className="input-info">
                                    <h4>Huéspedes</h4>
                                    <p>1 adulto</p>
                                </div>
                            </div>
                            <div className="fechas">
                                <i className="bi bi-calendar-week-fill"></i>
                                <div className="input-info">
                                    <h4>Fecha de entrada</h4>
                                    <p>lun, 6 nov 2023</p>
                                </div>
                            </div>
                            <div className="fechas">
                                <i className="bi bi-calendar-week-fill"></i>
                                <div className="input-info">
                                    <h4>Fecha de salida</h4>
                                    <p>mar, 7 nov 2023</p>
                                </div>
                            </div>

                            <div className="input cambiar-fecha" onClick={handleCalendar}>
                                <i className="bi bi-calendar-week-fill"></i>
                                <div className="input-info">
                                    <h4>Cambiar fecha</h4>
                                </div>
                            </div>

                            {
                                isCalendar ?
                                <div className="fechas-popup">
                                    <Calendar
                                        showDoubleView={true}
                                        selectRange
                                        minDetail="year"
                                        minDate={new Date()}
                                        calendarType="gregory"
                                        className={"calendario"}
                                        /* value={[startDate, endDate]}
                                        onChange={handleDateChange} */
                                    />
                                </div>
                                : ""
                            }

                        </div>
                        <h2 className="subtitulo">Seleccione una habitación</h2>
                        <div className="habitaciones">
                            {categoriasEl}
                        </div>
                    </div>
                    <div className="reservas-resumen">
                        <h3>Su estancia</h3>
                        <div className="fechas">
                            <div className="fecha">
                                <p><span>Fecha de entrada</span></p>
                                <p>Después de 15:00</p>
                            </div>
                            <div className="fecha">
                                <p><span>Fecha de salida</span></p>
                                <p>antes de 12:00</p>
                            </div>
                        </div>
                        <p>lun, 6 nov 2023 - mar, 7 nov 2023</p>
                        <p>1 adulto</p>
                        <div className="resumen-total">
                            <p>Total: <span>S/0.00</span></p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}