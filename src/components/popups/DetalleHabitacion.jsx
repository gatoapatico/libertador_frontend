import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function DetalleHabitacion({ handlePopDetalle }) {

    const [bigImage, setBigImage] = useState("suite-imperial-1.png");

    function handleImageChange(e) {
        setBigImage(e.src.split("/")[e.src.split("/").length - 1]);
        e.parentNode.querySelectorAll("img").forEach(img => img.classList.remove("selected"));
        e.classList.add("selected");
    }

    return (
        <div className="popup-detallehabitacion">
            <img className="image-big" src={`images/rooms/${bigImage}`} alt={`foto Suite Imperial 1`} />
            <div className="info">
                <div className="imagenes">
                    <img className="selected" onClick={(e) => handleImageChange(e.target)} src={`images/rooms/suite-imperial-1.png`} alt={`foto Suite Imperial 1`} />
                    <img className="" onClick={(e) => handleImageChange(e.target)} src={`images/rooms/suite-imperial-2.png`} alt={`foto Suite Imperial 2`} />
                    <img className="" onClick={(e) => handleImageChange(e.target)} src={`images/rooms/suite-imperial-3.png`} alt={`foto Suite Imperial 3`} />
                </div>
                <h1>SUITE IMPERIAL</h1>
                <p>
                    Nuestra habitación de mayor clase, cuenta con un amplio dormitorio de suma elegancia 
                    y un salón con cortinados de terciopelo, rica tapicería, boiserie y molduras. Incluye 
                    un mayordomo de servicio permanente, jacuzzi privado con sales y un desayuno gourmet. 
                    También permite el acceso a la Sala de Épocas con música en vivo y shows de aires victorianos.
                </p>
            </div>
            <span onClick={handlePopDetalle}><IoCloseCircleSharp /></span>
        </div>
    )
}