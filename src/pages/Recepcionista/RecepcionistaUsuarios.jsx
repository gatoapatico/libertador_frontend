import React, { useEffect, useState } from "react";
import axios from "axios";

const RecepcionistaUsuarios = () => {
  const [isOpenSection, setIsOpenSection] = useState(false);
  const urlBase = "http://localhost:8080/api/usuarios";
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = async () => {
    try {
      const resultado = await axios.get(urlBase);
      setUsuarios(resultado.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      // Handle error - you can add error handling logic here
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  function handleShowReservas(reservas) {
    // Update the 'showReservas' flag in the respective user's data
    const updatedUsuarios = usuarios.map((usuario) => {
      if (usuario.reservas === reservas) {
        return { ...usuario, showReservas: !usuario.showReservas };
      }
      return usuario;
    });
    setUsuarios(updatedUsuarios);
  }

  return (
    <div className="recepcionista-reservas">
      <h1>USUARIOS</h1>
      <div className="panels">
        <div className="usuarios-tabla panel">
          <table className="usuarios-tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Reservas</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <React.Fragment key={usuario.id}>
                  <tr>
                    <td>{usuario.id}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.telefono}</td>
                    <td>{usuario.estado}</td>
                    <td>
                      <button onClick={() => handleShowReservas(usuario.reservas)}>
                        {usuario.showReservas ? '-' : '+'}
                      </button>
                    </td>
                  </tr>
                  {usuario.showReservas && (
                    <tr>
                      <td colSpan="5">
                        <table>
                          <thead>
                            <tr>
                              <th>Número de Habitación</th>
                              <th>Tipo de Habitación</th>
                              <th>Total Pago</th>
                              <th>Fecha Reserva</th>
                              <th>Check In</th>
                              <th>Check Out</th>
                            </tr>
                          </thead>
                          <tbody>
                            {usuario.reservas.map((reserva) => (
                              <tr key={reserva.id}>
                                <td>{reserva.detalleReserva[0].habitaciones.numHabitacion}</td>
                                <td>{reserva.detalleReserva[0].habitaciones.tipoHabitacion.nombre}</td>
                                <td>{`S/ ${(reserva.total + (reserva.total * 0.18)).toFixed(2)}`}</td>
                                <td>{reserva.fechaReserva}</td>
                                <td>{reserva.detalleReserva[0].checkIn}</td>
                                <td>{reserva.detalleReserva[0].chackOut}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecepcionistaUsuarios;
