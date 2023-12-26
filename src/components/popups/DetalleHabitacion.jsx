import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

export default function DetalleHabitacion({ handlePopDetalle, categoriaPop }) {


    const fotosEl = categoriaPop.imagenes.map(imagen => imagen.path);

    const imagenesEl = fotosEl.map((imagen, index) => {
        return (
            <img
                key={imagen}
                className={index === 0 ? "selected" : ""}
                onClick={(e) => handleImageChange(e.target)}
                src={`/images/rooms/${imagen}`}
                alt={`foto ${imagen}`}
            />
        )
    });

    const [bigImage, setBigImage] = useState(fotosEl[0]);

    function handleImageChange(e) {
        setBigImage(e.src.split("/")[e.src.split("/").length - 1]);
        e.parentNode.querySelectorAll("img").forEach(img => img.classList.remove("selected"));
        e.classList.add("selected");
    }

    return (
        <div className="popup-detallehabitacion">
            <img className="image-big" src={`/images/rooms/${bigImage}`} alt={`foto ${categoriaPop.nombre}`} />
            <div className="info">
                <div className="imagenes">
                    {imagenesEl}
                </div>
                <h1>{categoriaPop.nombre.toUpperCase()}</h1>
                <p>{categoriaPop.descripcionLarga}</p>
            </div>
            <span onClick={handlePopDetalle}><IoCloseCircleSharp /></span>
        </div>
    )
}