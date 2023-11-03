export default function Landing() {
    return (
        <section className="landing">
            <div className="landing-content">
                <h1><span>B</span>IENVENIDO AL <span>L</span>IBERTADOR</h1>
                <h3>descubre el lujo que trasciende el tiempo</h3>
                <div className="availability-section">
                    <h2>Reserva directa</h2>
                    {/* <input type="date" /> */}
                    <h2 className="date-select"><i className="bi bi-calendar-week-fill"></i>fecha llegada - fecha salida</h2>
                    <h2 className="btn-availability">Comprobar disponibilidad</h2>
                </div>
            </div>
        </section>
    )
}