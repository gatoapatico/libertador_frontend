import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

export default function Header({ openLogin, user, handleLogOut}) {

    const [isUserOpen, setIsUserPop] = useState(false);

    function handleUserPop() {
        setIsUserPop(prev => !prev);
    }

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
                { user != null ? <p className="saludo">{`Hola ${user.nombre}!`}</p> : "" }
                <div className="user-section">

                    {
                        user != null ?
                        <button className="btn-login logged" onClick={handleUserPop}><i className="bi bi-person-fill"></i><span></span></button>
                        : <button className="btn-login" onClick={openLogin}><i className="bi bi-person-fill"></i><span> INICIAR SESIÓN</span></button>
                    }

                    {
                        isUserOpen ?
                        <div className="user-pop">
                            <ul>
                                <li><FaUser />usuario</li>
                                <li onClick={handleLogOut}><IoLogOut />cerrar sesión</li>
                            </ul>
                        </div>
                        : ""
                    }
                    
                </div>
                <Link to={"/reserva"}><button className="btn-reserva">RESERVA YA</button></Link>
            </div>
        </header>
    )
}