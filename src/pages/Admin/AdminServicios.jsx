import axios from "axios";
import { useEffect, useState } from "react";
import AdminServiciosRegistro from "./AdminServiciosRegistro";
import AdminServiciosModificar from "./AdminServiciosModificar";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

export default function AdminServicios() {

  const [isOpenSection, setIsOpenSection] = useState(false);

  const urlBase = "http://localhost:8080/api/servicios";
  const [servicios, setServicios] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    cargarServicios();
  }, [currentPage]);

  function openSection() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpenSection(prev => !prev);
  }

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

    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpenSection(true);

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

  const finalizarModificacion = () => {
    setIsModifying(false);
    setIsCreating(true);
  };
  return (
    <div className="admin-usuarios">
      <h1>SERVICIOS</h1>
      <button className="btn-abrir-seccion" onClick={openSection}>{ isOpenSection ? "Cerrar Sección" : "Crear Nuevo Servicio"}</button>
      <div className="panels">
        {
          isOpenSection ?

          isModifying || isCreating ? (
            <div className="usuarios-form">
              <h3>{isModifying ? "Modificar Servicio" : "Crear Servicio"}</h3>
              {isModifying && (
                <AdminServiciosModificar
                  id={servicioSeleccionado.id}
                  cargarServicios={cargarServicios}
                  finalizarModificacion={finalizarModificacion}
                />
              )}
              {isModifying && (
                <button className="btn-ir-crear" onClick={crearServicio}>Ir a crear Servicio</button>
              )}
              {isCreating && (
                <AdminServiciosRegistro cargarServicios={cargarServicios} />
              )}
            </div>
          ) : (
            <div className="usuarios-form">
              <h3>Crear Servicio</h3>
              <AdminServiciosRegistro cargarServicios={cargarServicios} />
            </div>
          )

          : ""
        }

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
                    <div className="botones-celda">
                      <button onClick={() => cambiarEstado(servicio.id)}>
                        {servicio.estado === "Activo" ? "Desactivar" : "Activar"}
                      </button>
                      <button onClick={() => ModificarServicio(servicio.id)}>
                        Modificar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn-paginacion" onClick={prevPage}><MdNavigateBefore /> Página anterior</button>
          <button className="btn-paginacion" onClick={nextPage}>Página siguiente <MdNavigateNext /></button>
        </div>

      </div>
    </div>
  );
}
