export default function Services() {
    return (
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
    )
}