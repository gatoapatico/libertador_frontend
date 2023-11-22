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
    <div className="recepcionista-reservas">
      <h1>RESERVAS</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>checkIn</th>
            <th>checkOut</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
        {reservas.map((reserva) => (
  <tr key={reserva.id}>
    <td>{reserva.id}</td>
    <td>{reserva.detalleReserva.checkIn}</td>
    <td>{reserva.detalleReserva.chackOut}</td>
    <td>{reserva.usuario.nombre}</td>
  </tr>
))}



        </tbody>
      </table>
    </div>
  );
};

export default RecepcionistaReservas;
