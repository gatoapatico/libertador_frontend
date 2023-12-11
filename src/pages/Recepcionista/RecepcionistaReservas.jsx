import React, { useState, useEffect } from "react";

const RecepcionistaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [dni, setDni] = useState(""); // Nuevo estado para almacenar el DNI
  const [searchResult, setSearchResult] = useState(null);
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

  const handleSearch = async () => {
    const response = await fetch(
      `http://localhost:8080/api/reservas/dni/${dni}`
    );
    const data = await response.json();
    setSearchResult(data);
  };
  const handleShowAll = () => {
    setSearchResult(null); // Restablecer el estado de búsqueda
  };
  return (
    <div className="recepcionista-reservas">
      <h1>RESERVAS</h1>
      <div className="search">
        <label htmlFor="dni">Buscar por DNI: </label>
        <input
          type="text"
          id="dni"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
        {searchResult && <button onClick={handleShowAll}>Mostrar Todo</button>}
      </div>
      <div className="panels">
        <div className="usuarios-tabla">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Total</th>
                <th>Fecha Reserva</th>
                <th>Usuario</th>
                <th>DNI</th>
                <th>Check In</th>
                <th>Check Out</th>
              </tr>
            </thead>
            <tbody>
              {(searchResult ? searchResult : reservas).map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.total}</td>
                  <td>{reserva.fechaReserva}</td>
                  <td>
                    {reserva.usuario.nombre} {reserva.usuario.apellido}
                  </td>
                  <td>{reserva.usuario.dni}</td>
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
