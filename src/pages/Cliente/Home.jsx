import { useOutletContext } from "react-router-dom"
import Landing from "../../components/Landing"
import { useEffect, useState } from "react"

export default function Home() {

    const [startDate, setStartDate, endDate, setEndDate] = useOutletContext();
    const [categorias, setCategorias] = useState([]);

    const urlParams = new URLSearchParams(window.location.search);

    if(urlParams.has('services')) {
        setTimeout(() => {
            if(document.getElementById("services") != null) {
                document.getElementById("services").scrollIntoView({ behavior: 'smooth'});
            }   
        }, 1);
    }
    else if(urlParams.has('rooms')) {
        setTimeout(() => {
            if(document.getElementById("rooms") != null) {
                document.getElementById("rooms").scrollIntoView({ behavior: 'smooth'});
            }   
        }, 1);
    }

    useEffect(() => {
        fetch('http://localhost:8080/api/categorias')
            .then(res => res.json())
            .then(data => setCategorias(data));
    }, []);

    const listaCategorias = categorias.map(categoria => {
        return (
            <div key={`${categoria.id}-${categoria.nombre}`} className="room">
                <img src={`https://hotel-libetador.s3.us-east-2.amazonaws.com/${categoria.foto[0].nombre}`} alt={`Foto ${categoria.nombre}`} />
                <h2>{categoria.nombre}</h2>
                <p>{categoria.descripcion_breve}</p>
            </div>
        )
    });

    return (
        <div className='home'>
            <Landing
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <section className="services" id="services">
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
            <section className="rooms" id="rooms">
                <h1>Nuestras Habitaciones</h1>
                <div className="room-cards">
                    {listaCategorias}
                </div>
            </section>
        </div>
    )
}