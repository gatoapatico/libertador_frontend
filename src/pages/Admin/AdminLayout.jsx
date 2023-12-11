import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { FaUser } from "react-icons/fa";

export default function AdminLayout() {

    const navigate = useNavigate();

    function goToHome() {
        navigate("/");
    }

    function handleLogOut() {
        window.localStorage.removeItem("user");
        navigate("/", { replace: true });
        window.location.reload();
    }

    return (
        <div className="contenedor-admin">
            <div className="header">
                <div className="logo-header">
                    <h1 onClick={goToHome} className="nombre">ADMINISTRADOR</h1>
                    <h1 onClick={goToHome}>HOTEL LIBERTADOR</h1>
                </div>
                <ul className="navbar">
                    <li><NavLink to={"habitaciones"}>Habitaciones<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"categorias"}>Categorias<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"servicios"}>Servicios<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"."}>Usuarios<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><button className="btn-logout" onClick={handleLogOut}>Log Out<FaUser className="icono-logout" /></button></li>
                </ul>
            </div>
            <Outlet />
        </div>
    )
}