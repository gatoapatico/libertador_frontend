import { Link } from "react-router-dom";

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
            <Link to={"/reserva"}><button className="btn-reserva">RESERVA YA</button></Link>
        </header>
    )
}