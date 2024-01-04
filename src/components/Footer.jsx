import { useState } from "react"

export default function Footer() {

    const [nombreI, setNombreI] = useState("");
    const [correoI, setCorreoI] = useState("");
    const [telefonoI, setTelefonoI] = useState("");

    const [isFailEmail, setIsFailEmail] = useState(false);
    const [isFailNombre, setIsFailNombre] = useState(false);
    const [isFailTelefono, setIsFailTelefono] = useState(false);

    const [isSent, setIsSent] = useState(false);

    function regexValidation(input, type) {
        let regex;
    
        switch (type) {
          case "email":
            regex = /^[a-z]+[a-z0-9.]*@[a-z]+\.[a-z]{2,3}$/;
            break;
          case "nombre":
            regex = /^[a-zA-Z ]+$/;
            break;
          case "telefono":
            regex = /^[0-9]{4,13}$/;
            break;
        }
    
        return regex.test(input);
    }

    function handleInformes() {

        regexValidation(nombreI, "nombre") ? setIsFailNombre(false) : setIsFailNombre(true);
        regexValidation(correoI, "email") ? setIsFailEmail(false) : setIsFailEmail(true);
        regexValidation(telefonoI, "telefono") ? setIsFailTelefono(false) : setIsFailTelefono(true);

        if (
            regexValidation(correoI, "email") &&
            regexValidation(nombreI, "nombre") &&
            regexValidation(telefonoI, "telefono")
            ) 
        {
            enviarUsuarioParaInformes();
        }
        else {
            console.log("Formato de datos de usuario incorrectos");
        }
        
    }

    function enviarUsuarioParaInformes() {
        const objetoInforme = {
            "nombres": nombreI,
            "correo": correoI,
            "telefono": telefonoI
        }

        fetch("https://libertador-backend.azurewebsites.net/informes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(objetoInforme),
        })
        .then((res) => {
            if (!res.ok) {
                //setIsFail(true);
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            console.log("Registro de correo para informe Exitoso");
            setIsSent(true);
        })
    }

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
                        <div className="info3-input">
                            <input type="text" onChange={(e) => setNombreI(e.target.value)} placeholder="Tus Nombres"/>
                            { isFailNombre ? <p className="fail-txt">Formato incorrecto</p> : "" }
                        </div>
                        <div className="info3-input">
                            <input type="email" onChange={(e) => setCorreoI(e.target.value)} placeholder="Tu correo electrónico"/>
                            { isFailEmail ? <p className="fail-txt">Formato incorrecto</p> : "" }
                        </div>
                        <div className="info3-input">
                            <input type="text" onChange={(e) => setTelefonoI(e.target.value)} pattern="[1-9]{3,}" placeholder="Tu teléfono"/>
                            { isFailTelefono ? <p className="fail-txt">Formato incorrecto</p> : "" }
                        </div>
                        {
                            isSent ?
                            <p className="txt-sent">Datos almacenados registrados para recibo de informes!</p>
                            :
                            <button onClick={handleInformes}>Enviar</button>
                        }
                        
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