import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useOutletContext } from "react-router-dom";
import TerminosCondiciones from "../../components/popups/TerminosCondiciones";
import DetalleHabitacion from "../../components/popups/DetalleHabitacion";


export default function Reserva() {

    const navigate = useNavigate();

    const [startDate, setStartDate, endDate, setEndDate] = useOutletContext();

    const checkInDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const checkOutDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

    const [categorias, setCategorias] = useState([]);
    const [isCalendar, setIsCalendar] = useState(false);

    const [isTermCond, setTermCond] = useState(false);
    const [isPopDetalle, setPopDetalle] = useState(false);
    const [categoriaPop, setCategoriaPop] = useState({});

    const [categoriaSelected, setCategoriaSelected] = useState(null);

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

    function handlePopDetalle(categoria) {
        setCategoriaPop(categoria);
        setPopDetalle(prev => !prev);
    }

    function handleReserva(categoria) {
        setCategoriaSelected(categoria);
    }

    function handlePagoReserva() {
        
        const objeto = {
            "checkIn" : startDate,
            "checkOut" : endDate,
            "categoria" : {...categoriaSelected}
        }
        scrollToTop();
        navigate("/pago", { state: objeto });
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {

        async function getCategoriasByHabitaciones() {
            const res = await fetch(`http://localhost:8080/api/habitaciones/disponibles?fechaCheckIn=${checkInDate}&fechaCheckOut=${checkOutDate}`);
            const data = await res.json();

            let dataIndexCategoriasDisponibles = {}

            data.forEach(habitacion => {
                if(habitacion.disponibilidad === "disponible") {
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

        const fotosEl = categoria.foto.map(foto => foto.nombre);

        let txtHabitacionesDisponibles = "";
        let txtBtnReservar = "";
        let btnStyles = "";
        let isDisabled = false;
        let styleHabitacion = "";

        if(categoria.habitacionesDisponibles != 0) {
            txtHabitacionesDisponibles = `Solo quedan ${categoria.habitacionesDisponibles} habitaciones disponibles`;
            txtBtnReservar = "RESERVAR AHORA";
            btnStyles = "btn-reservar"
        }
        else {
            txtHabitacionesDisponibles = `No quedan habitaciones disponibles para esta fecha`;
            txtBtnReservar = "NO DISPONIBLE";
            btnStyles = "btn-reservar unavailable";
            isDisabled = true;
        }

        if(categoriaSelected != null) {
            styleHabitacion = categoria.id === categoriaSelected.id ? "habitacion hab-selected" : "habitacion";
        }
        else {
            styleHabitacion = "habitacion";
        }

        return (
            <div key={nanoid()} className={styleHabitacion}>
                <div className="habitacion-imagen">
                    <img src={`images/rooms/${fotosEl[0]}`} alt={`foto ${categoria.nombre}`} />
                </div>
                <div className="habitacion-info">
                    <h3>{categoria.nombre}</h3>
                    <h4 className="descripcion">{categoria.descripcion_breve}</h4>
                    <p className="habtc-disponibles">{txtHabitacionesDisponibles}</p>
                    <ul>
                        {serviciosEl}
                    </ul>
                    <button className="btn-detalles" onClick={() => handlePopDetalle(categoria)}>Detalles de la habitación</button>
                    <div className="reserva-info">
                        <div className="info-adicional">
                            <button className="btn-terminos" onClick={handleTermCond}>Términos y condiciones</button>
                            <h4><i className="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                        </div>
                        <div className="precio-reserva">
                            <h1>S/{categoria.precioCategoria.toFixed(2)}</h1>
                            <p>Por noche</p>
                            <p>Impuestos y tasas excluidos</p>
                            <button disabled={isDisabled} className={btnStyles} onClick={() => handleReserva(categoria)}>{txtBtnReservar}</button>
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
                    {
                        categoriaSelected != null ?
                        <div className="reservas-resumen">
                            {/* <h3>Su estancia</h3> */}
                            <h2>{categoriaSelected.nombre}</h2>
                            <div className="fechas">
                                <div className="fecha">
                                    <p><span>Fecha de entrada</span></p>
                                    <p>{startDate.toLocaleDateString()}</p>
                                </div>
                                <div className="fecha">
                                    <p><span>Fecha de salida</span></p>
                                    <p>{endDate.toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p>{categoriaSelected.nombre}<span>{categoriaSelected.precioCategoria.toFixed(2)}</span></p>
                            <p>Servicios<span>{categoriaSelected.costoServicios.toFixed(2)}</span></p>
                            <p>IGV(18%)<span>{(categoriaSelected.costoTotalCategoria * 0.18).toFixed(2)}</span></p>
                            <div className="resumen-total">
                                <p>Total: <span>S/{(categoriaSelected.costoTotalCategoria + (categoriaSelected.costoTotalCategoria * 0.18)).toFixed(2)}</span></p>
                            </div>
                            <button className="btn-pagar-reserva" onClick={handlePagoReserva}>PAGAR RESERVA</button>
                        </div>
                        : ""
                    }
                </main>
            </div>
            { isTermCond ? <TerminosCondiciones handleTermCond={handleTermCond}/> : "" }
            { isPopDetalle ? <DetalleHabitacion handlePopDetalle={handlePopDetalle} categoriaPop={categoriaPop} /> : "" }
        </div>
    )
}