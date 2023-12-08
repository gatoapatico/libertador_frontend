import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useEffect } from 'react';
import { useState } from 'react';

export default function RecepcionistaHabitaciones() {

    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacionSelected, setHabitacionSelected] = useState(null);
    const [calendarEvents, setCalendarEvents] = useState([]);

    const localizer = momentLocalizer(moment);

    function handleChangeEvents(habitacion) {

        setHabitacionSelected(habitacion);

        let arrayEvents = [];

        habitacion.fechasReservadas.forEach(reserva => {
            arrayEvents.push({
                start: reserva.checkIn,
                end: new Date(reserva.checkOut.getTime() + 86400000),
                title: "Reservado"
            });
        });

        setCalendarEvents(arrayEvents);
    }

    const listaHabitaciones = habitaciones.map(habitacion => {

        return(
            <div
                onClick={() => handleChangeEvents(habitacion)}
                key={`${habitacion.numeroHabitacion}-${habitacion.tipoHabitacion}`}
                className={`tarjeta-habitacion ${habitacionSelected === habitacion ? "selected" : ""}`}
            >
                <h2>{habitacion.numeroHabitacion}</h2>
            </div>
        )
    });
    
    useEffect(() => {
        fetch("http://localhost:8080/api/habitaciones")
            .then(res => res.json())
            .then(data => setHabitaciones(data.map(habitacion => {

                const fechasDate = habitacion.fechasReservadas.map(fecha => {
                    const [year, month, day] = fecha.split("-");
            
                    return new Date(year, month - 1, day);
                });
            
                const fechasSort = fechasDate.sort((a, b) => a - b);
            
                let reservasArray = [];
                let currentCheckIn = null;
                let currentCheckOut = null;
            
                for(let i = 0; i < fechasSort.length; i++) {
            
                    if(currentCheckIn === null) {
                        currentCheckIn = fechasSort[i];
                    }
                    else if(i === fechasSort.length - 1) {
                        currentCheckOut = fechasSort[i];
                        reservasArray.push({
                            "checkIn": currentCheckIn,
                            "checkOut": currentCheckOut
                        });
                        currentCheckIn = null;
                        currentCheckOut = null;
                    }
                    else {
                        const nextDay = new Date(fechasSort[i].getTime() + 86400000);
            
                        if(fechasSort[i + 1].getTime() !== nextDay.getTime()) {
                            currentCheckOut = fechasSort[i];
                            reservasArray.push({
                                "checkIn": currentCheckIn,
                                "checkOut": currentCheckOut
                            });
                            currentCheckIn = null;
                            currentCheckOut = null;
                        }
                    }
                }

                return {
                    "numeroHabitacion": habitacion.numHabitacion,
                    "estado": habitacion.estado,
                    "tipoHabitacion": habitacion.tipoHabitacion.nombre,
                    "fechasReservadas": reservasArray
                };

            }).sort((a, b) => a.numeroHabitacion - b.numeroHabitacion)
            ));

    }, []);

    return (
        <div className="recepcionista-habitaciones">
            <div className='lista-habitaciones'>
                <h3>Lista de Habitaciones</h3>
                <div className='tarjetas'>
                    {listaHabitaciones}
                </div>
            </div>
            <div className='calendario-grande'>
                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    events={calendarEvents}
                    style={{ /* height: 400 */ }}
                />
            </div>
        </div>
    )
}