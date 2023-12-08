import { Link, useLocation, useOutletContext } from "react-router-dom";
import dateFormat, { i18n } from "dateformat";
import { useEffect, useState } from "react";

export default function BoletaReserva() {

    const [startDate, setStartDate, endDate, setEndDate, user, openLogin] = useOutletContext();
    const [reserva, setReserva] = useState(null);

    const location = useLocation();
    const { state } = location;
    const { checkIn, checkOut, categoria, idReserva } = state;

    const totalReserva = (categoria.costoTotalCategoria + (categoria.costoTotalCategoria * 0.18)).toFixed(2);

    i18n.dayNames = [
        "Dom","Lun","Mar","Mie","Jue","Vie","Sab",
        "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"
    ];

    i18n.monthNames = [
        "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic",
        "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    const listaServicios = categoria.servicios.map(servicio => {
        return (
            <li key={`${servicio.id}-${servicio.nombre}`}>{servicio.nombre}</li>
        )
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/reservas/${idReserva}`)
            .then(res => res.json())
            .then(data => setReserva(data));
    }, []);
    
    return (
        <div className="contenedor-boleta-reserva">
            <h1 className="titulo">RESERVA CONFIRMADA</h1>
            {
                reserva != null ?
                <div className="paneles">
                    <div className="contenedor-boleta">
                        <div className="panel panel1">
                            <b className="txt-confirmacion">¡Felicidades! Tu reserva se ha realizado con éxito.</b>
                            <p className="txt-envio-email">Te hemos enviado un correo electrónico con los detalles.</p>
                        </div>
                        <div className="panel panel2">
                            <div className="comprobante-encabezado">
                                <div className="info-encabezado">
                                    <p className="encabezado-titulo">HOTEL LIBERTADOR - COMPROBANTE DE PAGO</p>
                                    <p className="tarjeta-pedido">
                                        Reserva Confirmada: 
                                        <span className="tarjeta-pedido-codigo"> d757978e2c</span> | 
                                        <span className="tarjeta-pedido-fecha"> {dateFormat(reserva.fechaReserva, "dd mmmm yyyy")}</span>
                                    </p>
                                </div>
                                <div className="codigo-barras">
                                    <img src="/images/codigo-barras.png" alt="codigo de barras" />
                                </div>
                            </div>
                            <div className="tarjetas">
                                <div className="tarjeta datos-personales">
                                    <b>DATOS PERSONALES</b>
                                    <p>NOMBRE: <span className="tarjeta-nombre">{`${user.nombre} ${user.apellido}`}</span></p>
                                    <p>DNI: <span className="tarjeta-dni">{`${user.dni}`}</span></p>
                                    <p>CORREO: <span className="tarjeta-correo">{`${user.email}`}</span></p>
                                </div>
                                <div className="tarjeta medio-pago">
                                    <b>MEDIO DE PAGO</b>
                                    <p>PEDIDO: <span className="bold">d757978e2c</span></p>
                                    <p className="no-bold">Pago con tarjeta de Crédito (Visa)</p>
                                    <p className="no-bold">S/ <span>{totalReserva}</span></p>
                                </div>
                                <div className="tarjeta info-resumen">
                                    <b>RESUMEN</b>
                                    <p className="no-bold">{`${categoria.nombre} `}<span>S/ <span>{`${categoria.precioCategoria.toFixed(2)}`}</span></span></p>
                                    <p className="no-bold">Servicios <span>S/ <span>{`${categoria.costoServicios.toFixed(2)}`}</span></span></p>
                                    <p className="no-bold">IGV (18%) <span>S/ <span>{`${(categoria.costoTotalCategoria * 0.18).toFixed(2)}`}</span></span></p>
                                    <p className="no-bold tarjeta-total">Total <span>S/ <span>{totalReserva}</span></span></p>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel3">
                            <div className="info-pedido">
                                <p>RESERVA: <span>d757978e2c</span></p>
                                <p>TIPO DE HABITACIÓN: <span>{categoria.nombre}</span></p>
                                <p>FECHA INGRESO: <span>{dateFormat(checkIn, "dddd, d mmmm yyyy")}</span></p>
                                <p>FECHA SALIDA: <span>{dateFormat(checkOut, "dddd, d mmmm yyyy")}</span></p>
                            </div>
                            <div className="info-reserva">
                                <div className="imagen">
                                    <img src={`/images/rooms/${categoria.foto[0].nombre}`} alt={`Foto ${categoria.nombre}`} />
                                </div>
                                <div className="info">
                                    <h3>{categoria.nombre}</h3>
                                    <p>{categoria.descripcion_breve}</p>
                                    <h4>Servicios incluidos:</h4>
                                    <ul>
                                        {listaServicios}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link className="btn-seguir-comprando" to={"/perfil"}><i className="bi bi-arrow-left"></i>IR A RESERVAS</Link>
                </div>
                : ""
            }
            
        </div>
    )
}