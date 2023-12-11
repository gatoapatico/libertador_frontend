import { useEffect, useState } from "react";
import axios from "axios";
import AdminUsuariosRegistro from "./AdminUsuariosRegistro";
import AdminUsuariosModificar from "./AdminUsuariosModificar";

export default function AdminUsuarios() {

  const [isOpenSection, setIsOpenSection] = useState(false);

  const urlBase = "http://localhost:8080/api/usuarios";
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  function openSection() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpenSection((prev) => !prev);
  }

  const cargarUsuarios = async () => {
    try {
      const resultado = await axios.get(urlBase);
      console.log("Resultado cargar usuarios");
      console.log(resultado.data);
      setUsuarios(resultado.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  const cambiarEstado = async (id) => {
    try {
      await axios.put(`${urlBase}/${id}/estado`);
      // Vuelve a cargar los usuarios después de cambiar el estado del servicio
      cargarUsuarios();
    } catch (error) {
      console.error("Error al cambiar estado del usuario:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  const ModificarUsuario = async (id) => {

    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpenSection(true);

    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setUsuarioSeleccionado(resultado.data); // Establece el usuario seleccionado con los datos obtenidos
      setIsModifying(true);
      setIsCreating(false); // Establece que estamos en modo de modificación
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  const crearUsuario = () => {
    setIsCreating(true);
    setUsuarioSeleccionado(null); // Restablece el usuario seleccionado al crear uno nuevo
    setIsModifying(false); // Asegúrate de que estás en modo de creación y no modificación
  };

  const finalizarModificacion = () => {
    setIsModifying(false);
    setIsCreating(true);
  };

  return (
    <div className="admin-usuarios">
      <h1>USUARIOS</h1>
      <button className="btn-abrir-seccion" onClick={openSection}>
        {isOpenSection ? "Cerrar Sección" : "Crear Nuevo Usuario"}
      </button>
      <div className="panels">
        {
          isOpenSection ?
        
          isModifying || isCreating ? (
            <div className="usuarios-form">
              <h3>{isModifying ? "Modificar Usuario" : "Crear Usuario"}</h3>
              {isModifying && (
                <AdminUsuariosModificar
                  id={usuarioSeleccionado.id}
                  cargarUsuarios={cargarUsuarios}
                  finalizarModificacion={finalizarModificacion}
                />
              )}
              {isModifying && (
                <button className="btn-ir-crear" onClick={crearUsuario}>Ir a crear Usuario</button>
              )}
              {isCreating && (
                <AdminUsuariosRegistro cargarUsuarios={cargarUsuarios} />
              )}
            </div>
          ) : (
            <div className="usuarios-form">
              <h3>Crear Usuario</h3>
              <AdminUsuariosRegistro cargarUsuarios={cargarUsuarios} />
            </div>
          )
        
          : ""
        }
        <div className="usuarios-tabla">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th>CONTRASENA</th>
                <th>DNI</th>
                <th>NOMBRE</th>
                <th>APELLIDOS</th>
                <th>TELEFONO</th>
                <th>TIPO</th>
                <th>FECHA DE CREACION</th>
                <th>FECHA DE BAJA</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.contrasena}</td>
                  <td>{usuario.dni}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.tipo}</td>
                  <td>{usuario.fechaAlta}</td>
                  <td>
                    {usuario.fechaBaja
                      ? usuario.fechaBaja
                      : "El usuario esta activo"}
                  </td>
                  <td className="celda-estado">
                    <div className="botones-celda">
                      <button onClick={() => cambiarEstado(usuario.id)}>
                        {usuario.estado === "Activo" ? "Desactivar" : "Activar"}
                      </button>
                      <button onClick={() => ModificarUsuario(usuario.id)}>
                        Modificar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
