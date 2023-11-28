import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useOutletContext } from "react-router-dom";
import TerminosCondiciones from "../../components/popups/TerminosCondiciones";
import DetalleHabitacion from "../../components/popups/DetalleHabitacion";


export default function Reserva() {

    const [startDate, setStartDate, endDate, setEndDate] = useOutletContext();

    const checkInDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const checkOutDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

    const [categorias, setCategorias] = useState([]);
    const [isCalendar, setIsCalendar] = useState(false);

    const [isTermCond, setTermCond] = useState(false);
    const [isPopDetalle, setPopDetalle] = useState(false);

    function handleCalendar() {
        setIsCalendar(prevValue => !prevValue);
    }

    function handleDateChange(fechas) {
        const [startDate,endDate] = fechas;
        setStartDate(startDate);
        setEndDate(endDate);
        handleCalendar();
    }

    function handleTermCond() {
        setTermCond(prev => !prev);
    }

    function handlePopDetalle() {
        setPopDetalle(prev => !prev);
    }

    useEffect(() => {

        async function getCategoriasByHabitaciones() {
            const res = await fetch(`http://localhost:8080/api/habitaciones/disponibles?fechaCheckIn=${checkInDate}&fechaCheckOut=${checkOutDate}`);
            const data = await res.json();

            let dataIndexCategoriasDisponibles = {}

            data.forEach(habitacion => {
                if(habitacion.disponibilidad === "Disponible") {
                    dataIndexCategoriasDisponibles = {
                        ...dataIndexCategoriasDisponibles,
                        [habitacion.tipoHabitacion.id] : !dataIndexCategoriasDisponibles[habitacion.tipoHabitacion.id] ? 1 : dataIndexCategoriasDisponibles[habitacion.tipoHabitacion.id] + 1
                    }
                }
            });
            seteoDeCategorias(dataIndexCategoriasDisponibles);
        }

        async function seteoDeCategorias(dataIndexCategoriasDisponibles) {
            const res = await fetch('http://localhost:8080/api/categorias');
            const data = await res.json();

            const categoriasDisponibles = data.map(categoria => {
                if(Object.keys(dataIndexCategoriasDisponibles).map(id => parseInt(id)).includes(categoria.id)) {
                    return {
                        ...categoria,
                        "habitacionesDisponibles" : dataIndexCategoriasDisponibles[categoria.id]
                    }
                } else {
                    return {
                        ...categoria,
                        "habitacionesDisponibles" : 0
                    }
                }
            });
            setCategorias(categoriasDisponibles);
        }

        getCategoriasByHabitaciones();
        
    }, [endDate]);

    const categoriasEl = categorias.map(categoria => {

        const serviciosEl = categoria.servicios.map(servicio => {
            return (
                <li key={nanoid()}>{servicio.nombre}</li>
            )
        })

        let txtHabitacionesDisponibles = "";
        let txtBtnReservar = "";
        let btnStyles = "";

        if(categoria.habitacionesDisponibles != 0) {
            txtHabitacionesDisponibles = `Solo quedan ${categoria.habitacionesDisponibles} habitaciones disponibles`;
            txtBtnReservar = "RESERVAR AHORA";
            btnStyles = "btn-reservar"
        }
        else {
            txtHabitacionesDisponibles = `No quedan habitaciones disponibles para esta fecha`;
            txtBtnReservar = "NO DISPONIBLE";
            btnStyles = "btn-reservar unavailable";
        }

        return (
            <div key={nanoid()} className="habitacion">
                <div className="habitacion-imagen">
                    <img src={`images/rooms/${categoria.foto}`} alt={`foto ${categoria.nombre}`} />
                </div>
                <div className="habitacion-info">
                    <h3>{categoria.nombre}</h3>
                    <h4 className="descripcion">{categoria.descripcion_breve}</h4>
                    <p className="habtc-disponibles">{txtHabitacionesDisponibles}</p>
                    <ul>
                        {serviciosEl}
                    </ul>
                    <button className="btn-detalles" onClick={handlePopDetalle}>Detalles de la habitación</button>
                    <div className="reserva-info">
                        <div className="info-adicional">
                            <button className="btn-terminos" onClick={handleTermCond}>Términos y condiciones</button>
                            <h4><i className="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                        </div>
                        <div className="precio-reserva">
                            <h1>S/{categoria.precioCategoria.toFixed(2)}</h1>
                            <p>Por noche</p>
                            <p>Impuestos y tasas excluidos</p>
                            <button className={btnStyles}>{txtBtnReservar}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    });


    return (
        <div className="contenedor-reservas">
            <div className="main-reservas">
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
                                    <p>{startDate.toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="fechas">
                                <i className="bi bi-calendar-week-fill"></i>
                                <div className="input-info">
                                    <h4>Fecha de salida</h4>
                                    <p>{endDate.toLocaleDateString()}</p>
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
                                        defaultValue={[startDate, endDate]}
                                        onChange={handleDateChange}
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
            { isTermCond ? <TerminosCondiciones handleTermCond={handleTermCond}/> : "" }
            { isPopDetalle ? <DetalleHabitacion handlePopDetalle={handlePopDetalle} /> : "" }
        </div>
    )
}