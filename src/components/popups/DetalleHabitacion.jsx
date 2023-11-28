import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function DetalleHabitacion({ handlePopDetalle, categoriaPop }) {

    const [bigImage, setBigImage] = useState(categoriaPop.foto);

    function handleImageChange(e) {
        setBigImage(e.src.split("/")[e.src.split("/").length - 1]);
        e.parentNode.querySelectorAll("img").forEach(img => img.classList.remove("selected"));
        e.classList.add("selected");
    }

    return (
        <div className="popup-detallehabitacion">
            <img className="image-big" src={`images/rooms/${bigImage}`} alt={`foto ${categoriaPop.nombre}`} />
            <div className="info">
                <div className="imagenes">
                    <img className="selected" onClick={(e) => handleImageChange(e.target)} src={`images/rooms/suite-imperial-1.png`} alt={`foto Suite Imperial 1`} />
                    <img className="" onClick={(e) => handleImageChange(e.target)} src={`images/rooms/suite-imperial-2.png`} alt={`foto Suite Imperial 2`} />
                    <img className="" onClick={(e) => handleImageChange(e.target)} src={`images/rooms/suite-imperial-3.png`} alt={`foto Suite Imperial 3`} />
                </div>
                <h1>{categoriaPop.nombre.toUpperCase()}</h1>
                <p>{categoriaPop.descripcion_larga}</p>
            </div>
            <span onClick={handlePopDetalle}><IoCloseCircleSharp /></span>
        </div>
    )
}