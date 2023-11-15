import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Reserva from "./pages/Reserva"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reserva" element={<Reserva />}/>
            </Routes>
        </BrowserRouter>
    )
}