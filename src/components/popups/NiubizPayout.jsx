import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { ring2 } from 'ldrs'

export default function NiubizPayout({ closeNiubizPopup, pagoTotal, handlePago }) {

    const [tarjeta, setTarjeta] = useState("");
    const [fechas, setFechas] = useState("");
    const [cvv, setCvv] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");

    const [isFailTarjeta, setIsFailTarjeta] = useState(false);
    const [isFailFechas, setisFailFechas] = useState(false);
    const [isFailCvv, setIsFailCvv] = useState(false);
    const [isFailNombre, setIsFailNombre] = useState(false);
    const [isFailApellido, setIsFailApellido] = useState(false);
    const [isFailEmail, setIsFailEmail] = useState(false);

    const [isPaying, setIsPaying] = useState(false);

    function regexValidation(input, type) {
        let regex;
        
        switch(type) {
            case "tarjeta": regex = /^[0-9]{16}$/; break;
            case "fechas": regex = /^[0-9]{2}\/[0-9]{2}$/; break;
            case "cvv": regex = /^[0-9]{3,4}$/; break;
            case "nombre": regex = /^[a-zA-Z ]+$/; break;
            case "email": regex = /^[a-z]+[a-z0-9.]*@[a-z]+\.[a-z]{2,3}$/; break;
        }

        return regex.test(input);
    }

    function handleValidation() {
        
        regexValidation(tarjeta, "tarjeta") ? setIsFailTarjeta(false) : setIsFailTarjeta(true);
        regexValidation(fechas, "fechas") ? setisFailFechas(false) : setisFailFechas(true);
        regexValidation(cvv, "cvv") ? setIsFailCvv(false) : setIsFailCvv(true);
        regexValidation(nombre, "nombre") ? setIsFailNombre(false) : setIsFailNombre(true);
        regexValidation(apellido, "nombre") ? setIsFailApellido(false) : setIsFailApellido(true);
        regexValidation(email, "email") ? setIsFailEmail(false) : setIsFailEmail(true);

        if(
            regexValidation(tarjeta, "tarjeta") &&
            regexValidation(fechas, "fechas") &&
            regexValidation(cvv, "cvv") &&
            regexValidation(nombre, "nombre") &&
            regexValidation(apellido, "nombre") &&
            regexValidation(email, "email")
        ) {
            setIsPaying(true);
            setTimeout(() => {
                console.log("Se realiza la reserva!");
                handlePago();
            }, 3000);
        }
        else {
            console.log("Aún no está listo para reservar!");
        }
    }

    ring2.register()

    return (
        <div className="popup-niubiz-payout">
            <form>
                <img src="images/niubiz.png" alt="niubiz logo" />
                <div className="input">
                    <input className="input-form" type="text" onChange={(e) => setTarjeta(e.target.value)} placeholder="Número de Tarjeta"/>
                    { isFailTarjeta ? <p className="txt-fail">El formato de tarjeta es de 16 digitos</p> : "" }
                </div>
                <div className="input mid">
                    <input className="input-form" type="text" onChange={(e) => setFechas(e.target.value)} placeholder="MM/AA"/>
                    { isFailFechas ? <p className="txt-fail">Formato incorrecto</p> : "" }
                </div>
                <div className="input mid">
                    <input className="input-form" type="text" onChange={(e) => setCvv(e.target.value)} placeholder="CVV"/>
                    { isFailCvv ? <p className="txt-fail">Formato incorrecto</p> : "" }
                </div>
                <div className="input mid">
                    <input className="input-form" type="text" onChange={(e) => setNombre(e.target.value)} placeholder="First Name"/>
                    { isFailNombre ? <p className="txt-fail">Formato incorrecto</p> : "" }
                </div>
                <div className="input mid">
                    <input className="input-form" type="text" onChange={(e) => setApellido(e.target.value)} placeholder="Last Name"/>
                    { isFailApellido ? <p className="txt-fail">Formato incorrecto</p> : "" }
                </div>
                <div className="input">
                    <input className="input-form" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
                    { isFailEmail ? <p className="txt-fail">El formato de correo es incorrecto</p> : "" }
                </div>
                <button className="btn-niubiz-pay" type="button" onClick={handleValidation}>
                    {
                        isPaying ?
                        <l-ring-2
                            size="20"
                            stroke="3"
                            stroke-length="0.25"
                            bg-opacity="0.1"
                            speed="0.8" 
                            color="white" 
                        /> 
                        : `Pay S/ ${pagoTotal}`
                    }
                </button>
                <div className="medios-pagos">
                    <img src="/images/Visa.png" alt="Visa Logo" />
                    <img src="/images/Master-Card.png" alt="Master Card Logo" />
                    <img src="/images/Wester-Union.png" alt="Wester Union Logo" />
                    <img src="/images/American-Express.png" alt="American Express Logo" />
                </div>
            </form>
            <span className="btn-close" onClick={closeNiubizPopup}><IoCloseCircleSharp /></span>
        </div>
    )
}