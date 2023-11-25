import Landing from "../components/Landing"
import { useState } from "react"

export default function Home() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className='home'>
            <Landing
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <section className="services">
                <h1>Nuestros servicios</h1>
                <div className="services-cards">
                    <div className="service">
                        <img src="/images/services/24-hour.png" alt="24 horas" draggable={false}/>
                        <h3>Recepción 24h</h3>
                    </div>
                    <div className="service">
                        <img src="/images/services/icon-breakfast.png" alt="24 horas" draggable={false}/>
                        <h3>Desayuno</h3>
                    </div>
                    <div className="service">
                        <img src="/images/services/icon-restaurant.png" alt="24 horas" draggable={false}/>
                        <h3>Restaurante</h3>
                    </div>
                    <div className="service">
                        <img src="/images/services/icon-security.png" alt="24 horas" draggable={false}/>
                        <h3>Seguridad</h3>
                    </div>
                    <div className="service">
                        <img src="/images/services/icon-wifi.png" alt="24 horas" draggable={false}/>
                        <h3>Wifi</h3>
                    </div>
                    <div className="service">
                        <img src="/images/services/room_service.png" alt="24 horas" draggable={false}/>
                        <h3>Bar</h3>
                    </div>
                    <div className="service">
                        <img src="/images/services/smart-payment.png" alt="24 horas" draggable={false}/>
                        <h3>Pagos digitales</h3>
                    </div>
                </div>
            </section>
            <section className="rooms">
                <h1>Nuestras Habitaciones</h1>
                <div className="room-cards">
                    <div className="room">
                        <img src="/images/rooms/suite-imperial-1.png" alt="Suite Imperial" />
                        <h2>Suite Imperial</h2>
                    </div>
                    <div className="room">
                        <img src="/images/rooms/suite-clasica-1.png" alt="Suit Clasica" />
                        <h2>Suit Clásica</h2>
                    </div>
                    <div className="room">
                        <img src="/images/rooms/habitacion-retro-1.png" alt="Habitación Retro" />
                        <h2>Habitación Retro</h2>
                    </div>
                    <div className="room">
                        <img src="/images/rooms/loft-relojero-1.png" alt="Loft Relojero" />
                        <h2>Loft Relojero</h2>
                    </div>
                    <div className="room">
                        <img src="/images/rooms/vista-al-ayer-1.png" alt="Vista al Ayer" />
                        <h2>Vista al Ayer</h2>
                    </div>
                    <div className="room">
                        <img src="/images/rooms/atico-1.png" alt="Ático" />
                        <h2>Ático</h2>
                    </div>
                </div>
            </section>
        </div>
    )
}