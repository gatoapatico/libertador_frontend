import { NavLink, Outlet } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";
import { FaUser } from "react-icons/fa";

export default function AdminLayout() {
    return (
        <div className="contenedor-admin">
            <div className="header">
                <div className="logo-header">
                    <h1 className="nombre">ADMINISTRADOR</h1>
                    <h1>HOTEL LIBERTADOR</h1>
                </div>
                <ul className="navbar">
                    <li><NavLink to={"habitaciones"}>Habitaciones<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"salones"}>Salones<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"categorias"}>Categorias<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"servicios"}>Servicios<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"."}>Usuarios<IoIosArrowUp className="icono" /></NavLink></li>
                    <li><NavLink to={"."}>Log Out<FaUser  className="icono-logout" /></NavLink></li>
                </ul>
            </div>
            <Outlet />
        </div>
    )
}