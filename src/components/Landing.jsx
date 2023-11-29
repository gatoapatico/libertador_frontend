import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";

export default function Landing({startDate, setStartDate, endDate, setEndDate}) {

    const [isCalendar, setIsCalendar] = useState(false);

    const navigate = useNavigate();

    function handleDateChange(fechas) {
        const [startDate,endDate] = fechas;
        setStartDate(startDate);
        setEndDate(endDate);
    }

    function abrir() {
        setIsCalendar(prevIsCalendar => !prevIsCalendar);
    }

    function goToReserva() {
        scrollToTop();
        navigate("/reserva");
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <section className="landing">
            
            <div className="landing-content">
                <h1><span>B</span>IENVENIDO AL <span>L</span>IBERTADOR</h1>
                <h3>descubre el lujo que trasciende el tiempo</h3>
                <div className="availability-section">
                    <h2>Reserva directa</h2>
                    <h2 className="date-select" onClick={abrir}><i className="bi bi-calendar-week-fill"></i>fecha llegada - fecha salida</h2>
                    <h2 className="btn-availability" onClick={goToReserva}>Comprobar disponibilidad</h2>
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
            </div>
        </section>
    )
}