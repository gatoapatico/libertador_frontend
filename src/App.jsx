import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Reserva from "./pages/Reserva";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminHabitaciones from "./pages/Admin/AdminHabitaciones";
import AdminSalones from "./pages/Admin/AdminSalones";
import AdminCategorias from "./pages/Admin/AdminCategorias";
import AdminServicios from "./pages/Admin/AdminServicios";
import AdminUsuarios from "./pages/Admin/AdminUsuarios";
import RecepcionistaLayout from "./pages/Recepcionista/RecepcionistaLayout";
import RecepcionistaReservas from "./pages/Recepcionista/RecepcionistaReservas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="reserva" element={<Reserva />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminUsuarios />} />
          <Route path="habitaciones" element={<AdminHabitaciones />} />
          <Route path="salones" element={<AdminSalones />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="servicios" element={<AdminServicios />} />
        </Route>

        <Route path="recepcionista" element={<RecepcionistaLayout />}>
          <Route index element={<RecepcionistaReservas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
