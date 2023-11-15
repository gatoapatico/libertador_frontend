import { Link } from "react-router-dom";

export default function Reserva() {
    return (
        <div class="main-reservas">
            <header class="header">
                <Link to={"/"}><img class="logo" src="images/libertador_logo.png" alt="Libertador Logo" /></Link>
                <nav class="navbar">
                    <ul>
                        <li>Mis reservas</li>
                        <li><button class="btn-login"><i class="bi bi-person-fill"></i>INICIAR SESIÓN</button></li>
                    </ul>
                </nav>
            </header>
            <main class="reservas-container">
                <div class="reservas-user">
                    <div class="inputs-user">
                        <div class="input">
                            <i class="bi bi-person-standing"></i>
                            <div class="input-info">
                                <h4>Huéspedes</h4>
                                <p>1 adulto</p>
                            </div>
                        </div>
                        <div class="input">
                            <i class="bi bi-calendar-week-fill"></i>
                            <div class="input-info">
                                <h4>Fecha de entrada</h4>
                                <p>lun, 6 nov 2023</p>
                            </div>
                        </div>
                        <div class="input">
                            <i class="bi bi-calendar-week-fill"></i>
                            <div class="input-info">
                                <h4>Fecha de salida</h4>
                                <p>mar, 7 nov 2023</p>
                            </div>
                        </div>
                    </div>
                    <h2 class="subtitulo">Seleccione una habitación</h2>
                    <div class="habitaciones">
                        <div class="habitacion">
                            <div class="habitacion-imagen">
                                <img src="images/rooms/deluxe-king-1.png" alt="Deluxe, King 1" />
                            </div>
                            <div class="habitacion-info">
                                <h3>Deluxe, King 1</h3>
                                <p>Solo quedan 2 habitaciones</p>
                                <ul>
                                    <li>1 cama de tamaño king - De 19 a 22m² / de 205 a 236 pies²</li>
                                    <li>Zona de esta con sofá de una plaza, escritorio con silla y guardarropa y armario clásicos</li>
                                </ul>
                                <button class="btn-detalles">Detalles de la habitación</button>
                                <div class="reserva-info">
                                    <div class="info-adicional">
                                        <button class="btn-terminos">Términos y condiciones</button>
                                        <h4><i class="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                                    </div>
                                    <div class="precio-reserva">
                                        <h1>S/228.00</h1>
                                        <p>Por noche</p>
                                        <p>Impuestos y tasas excluidos</p>
                                        <button class="btn-reservar">RESERVAR AHORA</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="habitacion">
                            <div class="habitacion-imagen">
                                <img src="images/rooms/deluxe-queen-2.png" alt="Deluxe, Queen 2" />
                            </div>
                            <div class="habitacion-info">
                                <h3>Deluxe, Queen 2</h3>
                                <p>Solo quedan 3 habitaciones</p>
                                <ul>
                                    <li>Baño de marmol</li>
                                    <li>Bañera y ducha por separado</li>
                                </ul>
                                <button class="btn-detalles">Detalles de la habitación</button>
                                <div class="reserva-info">
                                    <div class="info-adicional">
                                        <button class="btn-terminos">Términos y condiciones</button>
                                        <h4><i class="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                                    </div>
                                    <div class="precio-reserva">
                                        <h1>S/308.00</h1>
                                        <p>Por noche</p>
                                        <p>Impuestos y tasas excluidos</p>
                                        <button class="btn-reservar">RESERVAR AHORA</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="habitacion">
                            <div class="habitacion-imagen">
                                <img src="images/rooms/standard-doble.jpg" alt="Standard Doble" />
                            </div>
                            <div class="habitacion-info">
                                <h3>Standard, Doble</h3>
                                <p></p>
                                <ul>
                                    <li>1 cama 2 plazas + 1 Cama 1.5 plaza</li>
                                    <li>Servicio al cuarto</li>
                                </ul>
                                <button class="btn-detalles">Detalles de la habitación</button>
                                <div class="reserva-info">
                                    <div class="info-adicional">
                                        <button class="btn-terminos">Términos y condiciones</button>
                                        <h4><i class="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                                    </div>
                                    <div class="precio-reserva">
                                        <h1>S/158.00</h1>
                                        <p>Por noche</p>
                                        <p>Impuestos y tasas excluidos</p>
                                        <button class="btn-reservar">RESERVAR AHORA</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="habitacion">
                            <div class="habitacion-imagen">
                                <img src="images/rooms/standard-matrimonial.jpg" alt="Standard Matrimonial" />
                            </div>
                            <div class="habitacion-info">
                                <h3>Standard, Matrimonial</h3>
                                <p></p>
                                <ul>
                                    <li>1 cama 2 plazas</li>
                                    <li>Agua caliente</li>
                                </ul>
                                <button class="btn-detalles">Detalles de la habitación</button>
                                <div class="reserva-info">
                                    <div class="info-adicional">
                                        <button class="btn-terminos">Términos y condiciones</button>
                                        <h4><i class="bi bi-credit-card-fill"></i>Depósito obligatorio</h4>
                                    </div>
                                    <div class="precio-reserva">
                                        <h1>S/158.00</h1>
                                        <p>Por noche</p>
                                        <p>Impuestos y tasas excluidos</p>
                                        <button class="btn-reservar">RESERVAR AHORA</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reservas-resumen">
                    <h3>Su estancia</h3>
                    <div class="fechas">
                        <div class="fecha">
                            <p><span>Fecha de entrada</span></p>
                            <p>Después de 15:00</p>
                        </div>
                        <div class="fecha">
                            <p><span>Fecha de salida</span></p>
                            <p>antes de 12:00</p>
                        </div>
                    </div>
                    <p>lun, 6 nov 2023 - mar, 7 nov 2023</p>
                    <p>1 adulto</p>
                    <div class="resumen-total">
                        <p>Total: <span>S/0.00</span></p>
                    </div>
                </div>
            </main>
        </div>
    )
}