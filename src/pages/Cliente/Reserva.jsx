import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate, useOutletContext } from "react-router-dom";
import TerminosCondiciones from "../../components/popups/TerminosCondiciones";
import DetalleHabitacion from "../../components/popups/DetalleHabitacion";
import dateFormat, { i18n } from "dateformat";


export default function Reserva() {

    i18n.dayNames = [
        "Dom","Lun","Mar","Mie","Jue","Vie","Sab",
        "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"
    ];

    i18n.monthNames = [
        "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic",
        "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    const DATE_FORMAT = "dddd d, mmmm yyyy";

    const navigate = useNavigate();

    const [startDate, setStartDate, endDate, setEndDate, user, openLogin] = useOutletContext();

    const checkInDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const checkOutDate = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;

    const [categorias, setCategorias] = useState([]);
    const [isCalendar, setIsCalendar] = useState(false);

    const [isTermCond, setTermCond] = useState(false);
    const [isPopDetalle, setPopDetalle] = useState(false);
    const [categoriaPop, setCategoriaPop] = useState({});

    const [categoriaSelected, setCategoriaSelected] = useState(null);

    const numeroDiasReservados = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

    let totalPrecioHabitacion;
    let totalPrecioServicios;
    let totalPrecioIGV;
    let totalFinal;

    if(categoriaSelected != null) {
        totalPrecioHabitacion = (categoriaSelected.precio * numeroDiasReservados).toFixed(2);
        totalPrecioServicios = (categoriaSelected.servicios.reduce((totalServicios, servicio) => totalServicios + servicio.costo, 0) * numeroDiasReservados).toFixed(2);
        totalPrecioIGV = ((parseFloat(totalPrecioHabitacion) + parseFloat(totalPrecioServicios)) * 0.18).toFixed(2);
        totalFinal = (parseFloat(totalPrecioHabitacion) + parseFloat(totalPrecioServicios) + parseFloat(totalPrecioIGV)).toFixed(2);
    }

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

        if(user != null) {
            const objeto = {
                "checkIn" : startDate,
                "checkOut" : endDate,
                "categoria" : {...categoriaSelected}
            }
            scrollToTop();
            navigate("/pago", { state: objeto });
        }
        else {
            openLogin();
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() => {

        async function getCategoriasByHabitaciones() {
            const res = await fetch(`http://localhost:8080/habitaciones/disponibles?checkin=${checkInDate}&checkout=${checkOutDate}`);
            const data = await res.json();

            let dataIndexCategoriasDisponibles = {}

            data.forEach(habitacion => {
                if(habitacion.disponibilidad === "Disponible") {
                    dataIndexCategoriasDisponibles = {
                        ...dataIndexCategoriasDisponibles,
                        [habitacion.categoria.id] : !dataIndexCategoriasDisponibles[habitacion.categoria.id] ? 1 : dataIndexCategoriasDisponibles[habitacion.categoria.id] + 1
                    }
                }
            });
            seteoDeCategorias(dataIndexCategoriasDisponibles);
        }

        async function seteoDeCategorias(dataIndexCategoriasDisponibles) {
            const res = await fetch('http://localhost:8080/categorias');
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

        const fotosEl = categoria.imagenes.map(imagen => imagen.path);

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
                    <img src={`/images/rooms/${fotosEl[0]}`} alt={`foto ${categoria.nombre}`} />
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
                            <h1>S/{categoria.precio.toFixed(2)}</h1>
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
                                {/* <i className="bi bi-person-standing"></i> */}
                                <div className="input-info">
                                    <h4>FECHAS DE RESERVA</h4>
                                    <p></p>
                                </div>
                            </div>
                            <div className="fechas">
                                <i className="bi bi-calendar-week-fill"></i>
                                <div className="input-info">
                                    <h4>Fecha de entrada</h4>
                                    <p>{`${dateFormat(startDate, DATE_FORMAT)}`}</p>
                                </div>
                            </div>
                            <div className="fechas">
                                <i className="bi bi-calendar-week-fill"></i>
                                <div className="input-info">
                                    <h4>Fecha de salida</h4>
                                    <p>{`${dateFormat(endDate, DATE_FORMAT)}`}</p>
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
                            <h2>{categoriaSelected.nombre}</h2>
                            <div className="fechas">
                                <div className="fecha">
                                    <p><span>Fecha de entrada</span></p>
                                    <p>{`${dateFormat(startDate, DATE_FORMAT)}`}</p>
                                </div>
                                <div className="fecha">
                                    <p><span>Fecha de salida</span></p>
                                    <p>{`${dateFormat(endDate, DATE_FORMAT)}`}</p>
                                </div>
                            </div>
                            <p>{`${categoriaSelected.nombre} x ${numeroDiasReservados} dia(s)`}<span>{totalPrecioHabitacion}</span></p>
                            <p>{`Servicios x ${numeroDiasReservados} dia(s)`}<span>{totalPrecioServicios}</span></p>
                            <p>IGV(18%)<span>{totalPrecioIGV}</span></p>
                            <div className="resumen-total">
                                <p>Total: <span>S/{totalFinal}</span></p>
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