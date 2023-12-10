import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";

export default function RecepcionistaLayout() {

    const navigate = useNavigate();

    function goToHome() {
        navigate("/");
    }

    return (
        <div className="contenedor-recepcionista">
            <div className="header">
                <div className="logo-header">
                    <h1 onClick={goToHome} className="nombre">RECEPCIONISTA</h1>
                    <h1 onClick={goToHome}>HOTEL LIBERTADOR</h1>
                </div>
                <ul className="navbar">
                    <li><NavLink to={"."}>Reservas<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"habitaciones"}>Habitaciones<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"."}>Log Out</NavLink></li>
                </ul>
            </div>
            <Outlet />
        </div>
    );
}
