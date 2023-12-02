import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminHabitaciones() {
  const urlBase = "http://localhost:8080/api/habitaciones";
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    cargarHabitaciones();
  }, []);
  const cargarHabitaciones = async () => {
    try {
      const resultado = await axios.get(urlBase);
      console.log("Resultado cargar habitaciones");
      console.log(resultado.data);
      setHabitaciones(resultado.data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  const cambiarEstado = async (id) => {
    try {
      await axios.put(`${urlBase}/${id}/estado`);
      // Vuelve a cargar los usuarios después de cambiar el estado del servicio
      cargarHabitaciones();
    } catch (error) {
      console.error("Error al cambiar estado de la habitaciones:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  const modificarHabitacion = async (id) => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setHabitacionSeleccionada(resultado.data); // Establece el usuario seleccionado con los datos obtenidos
      setIsModifying(true);
      setIsCreating(false); // Establece que estamos en modo de modificación
    } catch (error) {
      console.error("Error al obtener los datos de la habitacion:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  const crearHabitacion = () => {
    setIsCreating(true);
    setHabitacionSeleccionada(null); // Restablece el usuario seleccionado al crear uno nuevo
    setIsModifying(false); // Asegúrate de que estás en modo de creación y no modificación
  };

  const finalizarModificacion = () => {
    setIsModifying(false);
    setIsCreating(true);
  };

  const listaHabitaciones = habitaciones.map((habitacion) => {
    return (
      <tr key={habitacion.id}>
        <td>{habitacion.id}</td>
        <td>{habitacion.numHabitacion}</td>
        <td>{habitacion.costoTotalHabitacion}</td>
        <td>{habitacion.costohabitacion}</td>
        <td>{habitacion.costoServicios}</td>
        <td>
          <div className="servicios-lista">
            {habitacion.tipoHabitacion.servicios.map((servicio) => (
              <div key={servicio.id}>
                {servicio.nombre}{" "}
                <a className="servicioslista" href="#">
                  <i className="bx bx-x"></i>
                </a>{" "}
              </div>
            ))}
          </div>
        </td>
        <td>
          <div className="servicios-lista">
            {habitacion.tipoHabitacion && (
              <div key={habitacion.tipoHabitacion.id}>
                {habitacion.tipoHabitacion.nombre}{" "}
                <a className="servicioslista" href="#">
                  <i className="bx bx-x"></i>
                </a>{" "}
              </div>
            )}
          </div>
        </td>
        <td>{habitacion.maxPersonas}</td>

        <td>{habitacion.fechaAlta}</td>
        <td>
          {habitacion.fechaBaja
            ? habitacion.fechaBaja
            : "La habitacion esta activa"}
        </td>
        <td>{habitacion.disponibilidad}</td>
        <td className="celda-estado">
          <button onClick={() => cambiarEstado(habitacion.id)}>
            {habitacion.estado === "Activo" ? "Desactivar" : "Activar"}
          </button>
          <button onClick={() => modificarHabitacion(habitacion.id)}>
            Modificar
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div className="admin-usuarios">
      <h1>Habitaciones</h1>
      <div className="panels">
        <div className="usuarios-tabla">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>N Habitacion</th>
                <th>Costo Total</th>
                <th>Costo</th>
                <th>Costo servicios</th>
                <th>Servicios</th>
                <th>Tipo Hab.</th>
                <th>Max personas</th>
                <th>Fecha de Creacion</th>
                <th>Fecha de Baja</th>
                <th>Disponibilidad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>{listaHabitaciones}</tbody>
          </table>
        </div>
        <div className="usuarios-form">
          <h3>Crea-Modifica Usuarios</h3>
          <form action="">
            <br></br>
            <div className="input-form">
              <input type="text" id="txtEmail" placeholder="Ingrese un email" />
              {/* <label htmlFor="txtEmail">Email</label> */}
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtContrasena"
                placeholder="Ingrese una contraseña"
              />
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtDni"
                placeholder="Ingrese un número de dni"
              />
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtNombre"
                placeholder="Ingrese un nombre"
              />
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtApellido"
                placeholder="Ingrese un apellido"
              />
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtTelefono"
                placeholder="Ingrese un número de teléfono"
              />
            </div>
            <div className="input-form">
              <select id="txtTipo" required>
                <option value="Cliente">Cliente</option>
                <option value="Adminsitrador">Administrador</option>
              </select>
            </div>
            <button
              className="btn-crear-actualizar"
              onClick={(e) => handleForm(e)}
            >
              Crear/Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
