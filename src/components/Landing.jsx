import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function Landing() {

    const [isCalendar, setIsCalendar] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    function handleDateChange(fechas) {
        const [startDate,endDate] = fechas;
        setStartDate(startDate);
        setEndDate(endDate);
        console.log(startDate);
        console.log(endDate);
    }

    function abrir() {
        setIsCalendar(prevIsCalendar => !prevIsCalendar);
    }

    return (
        <section className="landing">
            
            <div className="landing-content">
                <h1><span>B</span>IENVENIDO AL <span>L</span>IBERTADOR</h1>
                <h3>descubre el lujo que trasciende el tiempo</h3>
                <div className="availability-section">
                    <h2>Reserva directa</h2>
                    <h2 className="date-select" onClick={abrir}><i className="bi bi-calendar-week-fill"></i>fecha llegada - fecha salida</h2>
                    <h2 className="btn-availability">Comprobar disponibilidad</h2>
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
                                value={[startDate, endDate]}
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