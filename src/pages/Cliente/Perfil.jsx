import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import dateFormat, { i18n } from "dateformat";

export default function Perfil() {

    const [startDate, setStartDate, endDate, setEndDate, user, openLogin] = useOutletContext();
    const [reservas, setReservas] = useState([]);

    i18n.dayNames = [
        "Dom","Lun","Mar","Mie","Jue","Vie","Sab",
        "Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"
    ];

    i18n.monthNames = [
        "Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic",
        "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    useEffect(() => {
        fetch(`http://localhost:8080/api/usuarios/${user.id}`)
            .then(res => res.json())
            .then(data => setReservas(data.reservas));
    }, []);

    const listaReservas = reservas.map((reserva, index) => {

        const fechaInicio = new Date(new Date(reserva.detalleReserva[0].checkIn).getTime() + 86400000);
        const fechaFinal = new Date(new Date(reserva.detalleReserva[0].chackOut).getTime() + 86400000);

        const numeroDiasReservados = Math.round((fechaFinal - fechaInicio) / (1000 * 60 * 60 * 24)) + 1;

        return (
            <tr key={`${reserva.id}-${reserva.fechaReserva}`}>
                <td>{index + 1}</td>
                <td>{dateFormat(new Date(new Date(reserva.detalleReserva[0].checkIn).getTime() + 86400000), "dd mmmm yyyy")}</td>
                <td>{dateFormat(new Date(new Date(reserva.detalleReserva[0].chackOut).getTime() + 86400000), "dd mmmm yyyy")}</td>
                <td>{reserva.codigoReserva}</td>
                <td>{`S/ ${((reserva.total + (reserva.total * 0.18)) * numeroDiasReservados).toFixed(2)}`}</td>
                <td>{reserva.detalleReserva[0].habitaciones.tipoHabitacion.nombre}</td>
                {/* <td><a><i className="bi bi-arrow-right-square-fill"></i>Ver</a></td> */}
            </tr>
        )
    });

    return (
        <div className="contenedor-perfil">
            <h1>PERFIL DE USUARIO</h1>
            <div className="perfil-campos">
                <div className="perfil-campo">
                    <label htmlFor="perfil-nombre">NOMBRE</label>
                    <p className="perfil-input" id="perfil-nombre">{user.nombre}</p>
                </div>
                <div className="perfil-campo">
                    <label htmlFor="perfil-apellido">APELLIDO</label>
                    <p className="perfil-input" id="perfil-apellido">{user.apellido}</p>
                </div>
                <div className="perfil-campo">
                    <label htmlFor="perfil-correo">CORREO</label>
                    <p className="perfil-input" id="perfil-correo">{user.email}</p>
                </div>
                <div className="perfil-campo">
                    <label htmlFor="perfil-documento">DOCUMENTO</label>
                    <p className="perfil-input" id="perfil-documento">{user.dni}</p>
                </div>
            </div>
            <h2>RESERVAS REALIZADAS</h2>
            <table className="tabla-pedidos-perfil">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Código de Reserva</th>
                        <th>Pago Total</th>
                        <th>Tipo de Habitación</th>
                        {/* <th>Acción</th> */}
                    </tr>
                </thead>
                <tbody>
                    {listaReservas}
                    {/* <tr>
                        <td className="txt-sinpedidos" colspan="6">Aún no has realizado ninguna reserva!</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}