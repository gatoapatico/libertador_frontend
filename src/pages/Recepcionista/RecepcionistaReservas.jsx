import { useEffect, useState } from "react";
import axios from "axios";

function RecepcionistaReservas() {
  const urlBase = "http://localhost:8080/api/reservas";
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const resultado = await axios.get(urlBase);
      console.log("Resultado cargar reservas");
      console.log(resultado.data);
      setReservas(resultado.data);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  return (
    <div className="admin-reservas">
      <h1>RESERVAS</h1>
      <div className="panels">
        <div className="reservas-tabla">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Servicio</th>
                <th>Usuario</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.fecha}</td>
                  <td>{reserva.hora}</td>
                  <td>{reserva.servicio.nombre}</td>
                  <td>{reserva.usuario.nombre}</td>
                  <td>{reserva.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RecepcionistaReservas;
