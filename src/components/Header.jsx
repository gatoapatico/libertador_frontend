import { Link } from "react-router-dom";

export default function Header({ openLogin, user, handleLogOut}) {
    return (
        <header className="header">
            <Link to={"/"}><img className="logo" src="/images/libertador_logo.png" alt="Libertador Logo" /></Link>
            <nav className="navbar">
                <ul>
                    <li>Servicios</li>
                    <li>Habitaciones</li>
                </ul>
            </nav>
            <div className="user">
                { user != null ? <p>{`Bienvenido ${user.nombre}`}</p> : "" }
                { user != null ? <button onClick={handleLogOut}>Cerrar Sesión</button> : "" }
                <button className="btn-login" onClick={openLogin}><i className="bi bi-person-fill"></i>INICIAR SESIÓN</button>
                <Link to={"/reserva"}><button className="btn-reserva">RESERVA YA</button></Link>
            </div>
        </header>
    )
}