import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/popups/Login";
import Registro from "../components/popups/Registro";

export default function Reserva() {

    const [isPopup, setIsPopup] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegistro, setIsRegistro] = useState(false);

    function openLogin() {
        setIsRegistro(false);
        setIsPopup(true);
        setIsLogin(true);
    }

    function openRegistro() {
        setIsPopup(true);
        setIsLogin(false);
        setIsRegistro(true);
    }

    function handleExit() {
        setIsLogin(false);
        setIsPopup(false);
        setIsRegistro(false);
    }

    return (
        <div className="contenedor-reservas">
            <div className="main-reservas">
                <header className="header">
                    <Link to={"/"}><img className="logo" src="images/libertador_logo.png" alt="Libertador Logo" /></Link>
                    <nav className="navbar">
                        <ul>
                            <li>Mis reservas</li>
                            <li><button className="btn-login" onClick={openLogin}><i className="bi bi-person-fill"></i>INICIAR SESIÓN</button></li>
                        </ul>
                    </nav>
                </header>
                <main className="reservas-container">
                    <div className="reservas-user">
                        <div className="inputs-user">
                            <div className="input">
                                <i className="bi bi-person-standing"></i>
                                <div className="input-info">
                                    <h4>Huéspedes</h4>
                                    <p>1 adulto</p>
                                </div>
                            </div>
                            <div className="input">
                                <i className="bi bi-calendar-week-fill"></i>
                                <div className="input-info">
                                    <h4>Fecha de entrada</h4>
                                    <p>lun, 6 nov 2023</p>
                                </div>
                            </div>
                            <div className="input">
                                <i className="bi bi-calendar-week-fill"></i>
                                <div className="input-info">
                                    <h4>Fecha de salida</h4>
                                    <p>mar, 7 nov 2023</p>
                                </div>
                            </div>
                        </div>
                        <h2 className="subtitulo">Seleccione una habitación</h2>
                        <div className="habitaciones">
                            <div className="habitacion">
                                <div className="habitacion-imagen">
                                    <img src="images/rooms/deluxe-king-1.png" alt="Deluxe, King 1" />
                                </div>
                                <div className="habitacion-info">
                                    <h3>Deluxe, King 1</h3>
                                    <p>Solo quedan 2 habitaciones</p>
                                    <ul>
                                        <li>1 cama de tamaño king - De 19 a 22m² / de 205 a 236 pies²</li>
                                        <li>Zona de esta con sofá de una plaza, escritorio con silla y guardarropa y armario clásicos</li>
                                    </ul>
                                    <button className="btn-detalles">Detalles de la habitación</button>
                                    <div className="reserva-info">
                                        <div className="info-adicional">
                                            <button className="btn-terminos">Términos y condiciones</button>
                                            <h4><i className="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                                        </div>
                                        <div className="precio-reserva">
                                            <h1>S/228.00</h1>
                                            <p>Por noche</p>
                                            <p>Impuestos y tasas excluidos</p>
                                            <button className="btn-reservar">RESERVAR AHORA</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="habitacion">
                                <div className="habitacion-imagen">
                                    <img src="images/rooms/deluxe-queen-2.png" alt="Deluxe, Queen 2" />
                                </div>
                                <div className="habitacion-info">
                                    <h3>Deluxe, Queen 2</h3>
                                    <p>Solo quedan 3 habitaciones</p>
                                    <ul>
                                        <li>Baño de marmol</li>
                                        <li>Bañera y ducha por separado</li>
                                    </ul>
                                    <button className="btn-detalles">Detalles de la habitación</button>
                                    <div className="reserva-info">
                                        <div className="info-adicional">
                                            <button className="btn-terminos">Términos y condiciones</button>
                                            <h4><i className="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                                        </div>
                                        <div className="precio-reserva">
                                            <h1>S/308.00</h1>
                                            <p>Por noche</p>
                                            <p>Impuestos y tasas excluidos</p>
                                            <button className="btn-reservar">RESERVAR AHORA</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="habitacion">
                                <div className="habitacion-imagen">
                                    <img src="images/rooms/standard-doble.jpg" alt="Standard Doble" />
                                </div>
                                <div className="habitacion-info">
                                    <h3>Standard, Doble</h3>
                                    <p></p>
                                    <ul>
                                        <li>1 cama 2 plazas + 1 Cama 1.5 plaza</li>
                                        <li>Servicio al cuarto</li>
                                    </ul>
                                    <button className="btn-detalles">Detalles de la habitación</button>
                                    <div className="reserva-info">
                                        <div className="info-adicional">
                                            <button className="btn-terminos">Términos y condiciones</button>
                                            <h4><i className="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                                        </div>
                                        <div className="precio-reserva">
                                            <h1>S/158.00</h1>
                                            <p>Por noche</p>
                                            <p>Impuestos y tasas excluidos</p>
                                            <button className="btn-reservar">RESERVAR AHORA</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="habitacion">
                                <div className="habitacion-imagen">
                                    <img src="images/rooms/standard-matrimonial.jpg" alt="Standard Matrimonial" />
                                </div>
                                <div className="habitacion-info">
                                    <h3>Standard, Matrimonial</h3>
                                    <p></p>
                                    <ul>
                                        <li>1 cama 2 plazas</li>
                                        <li>Agua caliente</li>
                                    </ul>
                                    <button className="btn-detalles">Detalles de la habitación</button>
                                    <div className="reserva-info">
                                        <div className="info-adicional">
                                            <button className="btn-terminos">Términos y condiciones</button>
                                            <h4><i className="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                                        </div>
                                        <div className="precio-reserva">
                                            <h1>S/158.00</h1>
                                            <p>Por noche</p>
                                            <p>Impuestos y tasas excluidos</p>
                                            <button className="btn-reservar">RESERVAR AHORA</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="reservas-resumen">
                        <h3>Su estancia</h3>
                        <div className="fechas">
                            <div className="fecha">
                                <p><span>Fecha de entrada</span></p>
                                <p>Después de 15:00</p>
                            </div>
                            <div className="fecha">
                                <p><span>Fecha de salida</span></p>
                                <p>antes de 12:00</p>
                            </div>
                        </div>
                        <p>lun, 6 nov 2023 - mar, 7 nov 2023</p>
                        <p>1 adulto</p>
                        <div className="resumen-total">
                            <p>Total: <span>S/0.00</span></p>
                        </div>
                    </div>
                </main>

                <div className={`blur-layout ${isPopup?"" : "hidden"}`} onClick={handleExit}>
                </div>
            </div>
            { isLogin ? <Login handleExit={handleExit} openRegistro={openRegistro}/> : "" }
            { isRegistro ? <Registro handleExit={handleExit} openLogin={openLogin}/> : "" }
        </div>
    )
}