import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Reserva from "./pages/Reserva"
import Admin from "./pages/Admin"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reserva" element={<Reserva />}/>
                <Route path="/admin" element={<Admin />}/>
            </Routes>
        </BrowserRouter>
    )
}