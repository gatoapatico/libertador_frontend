export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section1">
                    <div className="info info1">
                        <img className="logo" src="/images/libertador_logo.png" alt="Libertador Logo" />
                        <h3><i className="bi bi-telephone-inbound-fill"></i>+51 942 654 789</h3>
                        <h3><i className="bi bi-envelope-fill"></i>reservas@libertadorhotel.pe</h3>
                        <h3><i className="bi bi-geo-alt-fill"></i>Av. La libertad 472, Lima, Perú</h3>
                    </div>
                    <div className="info info2">
                        <ul>
                            <li>Inicio</li>
                            <li>Filosofia</li>
                            <li>Habitaciones</li>
                            <li>Promociones</li>
                            <li>Contacto</li>
                            <li>Libro de reclamaciones</li>
                        </ul>
                        <ul>
                            <li>Blog</li>
                            <li>Galería</li>
                            <li>Actividades</li>
                            <li>Bar Restaurante</li>
                            <li>Políticas del Hotel</li>
                        </ul>
                    </div>
                    <div className="info info3">
                        <h2>Informes</h2>
                        <input type="text" placeholder="Tus Nombres"/>
                        <input type="mail" placeholder="Tu correo electrónico"/>
                        <input type="text" pattern="[1-9]{3,}" placeholder="Tu teléfono"/>
                        <button>Enviar</button>
                    </div>
                </div>
                <div className="footer-section2">
                    <div className="info4">
                        <div className="medios-pagos">
                            <img src="/images/Visa.png" alt="Visa Logo" />
                            <img src="/images/Master-Card.png" alt="Master Card Logo" />
                            <img src="/images/Wester-Union.png" alt="Wester Union Logo" />
                            <img src="/images/American-Express.png" alt="American Express Logo" />
                        </div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1951.2342049081587!2d-76.93831617289761!3d-12.011239963224858!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5d06dc8b717%3A0x9f9bdb97c1ad6b1f!2sHostal%20Libertador!5e0!3m2!1sen!2spe!4v1699021347924!5m2!1sen!2spe" ></iframe>
                    </div>
                </div>
                <h4>© 2023 LIBERTADOR. Todos los derechos reservados.</h4>
            </div>
        </footer>
    )
}