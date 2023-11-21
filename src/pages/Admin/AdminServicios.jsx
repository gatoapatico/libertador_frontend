import axios from "axios";
import { useEffect, useState } from "react";
import AdminServiciosRegistro from "./AdminServiciosRegistro";
import AdminServiciosModificar from "./AdminServiciosModificar";

export default function AdminServicios() {
  const urlBase = "http://localhost:8080/api/servicios";
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    cargarServicios();
  }, [currentPage]);

  const cargarServicios = async () => {
    try {
      const resultado = await axios.get(`${urlBase}/page/${currentPage}`);
      console.log("Resultado cargar servicios");
      console.log(resultado.data);
      setServicios(resultado.data.content); // Asegúrate de que tu backend devuelve los datos en una propiedad 'content'
    } catch (error) {
      console.error("Error al cargar servicios:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const cambiarEstado = async (id) => {
    try {
      await axios.put(`${urlBase}/${id}/estado`);
      // Vuelve a cargar los usuarios después de cambiar el estado del servicio
      cargarServicios();
    } catch (error) {
      console.error("Error al cambiar estado del servicio:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  const ModificarServicio = async (id) => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setServicioSeleccionado(resultado.data); // Establece el usuario seleccionado con los datos obtenidos
      setIsModifying(true);
      setIsCreating(false); // Establece que estamos en modo de modificación
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  const crearServicio = () => {
    setIsCreating(true);
    setServicioSeleccionado(null); // Restablece el usuario seleccionado al crear uno nuevo
    setIsModifying(false); // Asegúrate de que estás en modo de creación y no modificación
  };
  return (
    <div className="admin-usuarios">
      <h1>SERVICIOS</h1>
      <div className="panels">
        <div className="usuarios-tabla">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>COSTO</th>
                <th>FECHA DE CREACION</th>
                <th>FECHA DE BAJA</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((servicio) => (
                <tr key={servicio.id}>
                  <td>{servicio.id}</td>
                  <td>{servicio.nombre}</td>
                  <td>S/.{servicio.costo}</td>
                  <td>{servicio.fechaAlta}</td>
                  <td>
                    {servicio.fechaBaja
                      ? servicio.fechaBaja
                      : "El servicio está activo"}
                  </td>
                  <td className="celda-estado">
                    <button onClick={() => cambiarEstado(servicio.id)}>
                      {servicio.estado === "Activo" ? "Desactivar" : "Activar"}
                    </button>
                    <button onClick={() => ModificarServicio(servicio.id)}>
                      Modificar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <button onClick={prevPage}>Página anterior</button>
            <button onClick={nextPage}>Página siguiente</button>
          </table>
        </div>
        {isModifying || isCreating ? (
          <div className="usuarios-form">
            <h3>{isModifying ? "Modificar Servicio" : "Crear Servicio"}</h3>
            {isModifying && (
              <AdminServiciosModificar
                id={servicioSeleccionado.id}
                cargarServicios={cargarServicios}
              />
            )}
            {isModifying && (
              <button onClick={crearServicio}>Crear Servicio</button>
            )}
            {isCreating && <AdminServiciosRegistro />}
          </div>
        ) : (
          <div className="usuarios-form">
            <h3>Crear Servicio</h3>
            <AdminServiciosRegistro cargarServicios={cargarServicios} />
          </div>
        )}
      </div>
    </div>
  );
}
