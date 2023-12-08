import { BrowserRouter, Route, Routes } from "react-router-dom";

import ClienteLayout from "./pages/Cliente/ClienteLayout";
import Home from "./pages/Cliente/Home";
import Perfil from "./pages/Cliente/Perfil";
import Reserva from "./pages/Cliente/Reserva";
import Pago from "./pages/Cliente/Pago";
import BoletaReserva from "./pages/Cliente/BoletaReserva";

import AdminLayout from "./pages/Admin/AdminLayout";
import AdminHabitaciones from "./pages/Admin/AdminHabitaciones";
import AdminSalones from "./pages/Admin/AdminSalones";
import AdminCategorias from "./pages/Admin/AdminCategorias";
import AdminServicios from "./pages/Admin/AdminServicios";
import AdminUsuarios from "./pages/Admin/AdminUsuarios";

import RecepcionistaLayout from "./pages/Recepcionista/RecepcionistaLayout";
import RecepcionistaReservas from "./pages/Recepcionista/RecepcionistaReservas";
import RecepcionistaHabitaciones from "./pages/Recepcionista/RecepcionistaHabitaciones";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ClienteLayout />} >
                    <Route index element={<Home />} />
                    <Route path="perfil" element={<Perfil />} />
                    <Route path="reserva" element={<Reserva />} />
                    <Route path="pago" element={<Pago />} />
                    <Route path="boleta-reserva" element={<BoletaReserva />} />
                </Route>

                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<AdminUsuarios />} />
                    <Route path="habitaciones" element={<AdminHabitaciones />} />
                    <Route path="salones" element={<AdminSalones />} />
                    <Route path="categorias" element={<AdminCategorias />} />
                    <Route path="servicios" element={<AdminServicios />} />
                </Route>

                <Route path="recepcionista" element={<RecepcionistaLayout />}>
                    <Route index element={<RecepcionistaReservas />} />
                    <Route path="habitaciones" element={<RecepcionistaHabitaciones />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
