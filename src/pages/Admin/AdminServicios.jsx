import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminServicios() {
  const urlBase = "http://localhost:8080/api/servicios";
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    cargarServicios();
  }, []);
  const cargarServicios = async () => {
    try {
      const resultado = await axios.get(urlBase);
      console.log("Resultado cargar servicios");
      console.log(resultado.data);
      setServicios(resultado.data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
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
              <tr>
                <td>1</td>
                <td>DESAYUNO</td>
                <td>45</td>
                <td>2023-11-10</td>
                <td></td>
                <td className="celda-estado">
                  <button>Desactivar</button>
                  <button>Modificar</button>
                </td>
              </tr>
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
                  <td>
                    <a
                      className="buttonTabla"
                      href="#"
                      id="boton1"
                      onClick={() => cambiarEstado(servicio.id)}
                    >
                      {servicio.estado === "Activo" ? "Desactivar" : "Activar"}
                    </a>
                    <a className="buttonTabla" href="#">
                      Modificar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
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
