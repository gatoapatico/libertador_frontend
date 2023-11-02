export default function Header() {
    return (
        <header className="header">
            <img className="logo" src="/images/libertador_logo.png" alt="Libertador Logo" />
            <nav className="navbar">
                <ul>
                    <li>Habitaciones</li>
                    <li>Salones</li>
                    <li>Promociones</li>
                    <li>Actividades</li>
                    <li>Galeria</li>
                </ul>
            </nav>
            <button className="btn-reserva">RESERVA YA</button>
        </header>
    )
}