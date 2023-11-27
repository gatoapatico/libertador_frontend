import React, { useState, useEffect } from "react";

const RecepcionistaReservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      const response = await fetch("http://localhost:8080/api/reservas");
      const data = await response.json();
      const formattedData = data.map((reserva) => {
        const { checkIn, chackOut } = reserva;
        return { ...reserva, checkIn, chackOut };
      });
      setReservas(formattedData);
    };
    fetchReservas();
  }, []);

  return (
    <div className="admin-usuarios">
        <h1>RESERVAS</h1>
        <div className="panels">
            <div className="usuarios-tabla">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Total</th>
                            <th>Fecha Reserva</th>
                            <th>Usuario</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => (
                        <tr key={reserva.id}>
                            <td>{reserva.id}</td>
                            <td>{reserva.total}</td>
                            <td>{reserva.fechaReserva}</td>
                            <td>{reserva.usuario.nombre}</td>
                            <td>{reserva.detalleReserva[0].checkIn}</td>
                            <td>{reserva.detalleReserva[0].chackOut}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default RecepcionistaReservas;
