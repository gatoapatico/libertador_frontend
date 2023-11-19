import { useEffect, useState } from "react";
import axios from "axios";
export default function AdminCategorias() {
  const urlBase = "http://localhost:8080/api/categorias";
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    cargarCategorias();
  }, []);
  const cargarCategorias = async () => {
    try {
      const resultado = await axios.get(urlBase);
      console.log("Resultado cargar categorias");
      console.log(resultado.data);
      setCategorias(resultado.data);
    } catch (error) {
      console.error("Error al cargar categorias:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  const cambiarEstado = async (id) => {
    try {
      await axios.put(`${urlBase}/${id}/estado`);
      // Vuelve a cargar las categorías después de cambiar el estado
      cargarCategorias();
    } catch (error) {
      console.error("Error al cambiar estado de la categoría:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  const listaCategorias = categorias.map((categoria) => {
    return (
      <tr key={categoria.id}>
        <td>{categoria.id}</td>
        <td>{categoria.nombre}</td>
        <td>{categoria.costoServicios}</td>
        <td>
          <div className="servicios-lista">
            <div>
              {categoria.servicios.map((servicio) => (
                <div key={servicio.id}>
                  {servicio.nombre}{" "}
                  <a className="servicioslista" href="#">
                    <i className="bx bx-x"></i>
                  </a>{" "}
                </div>
              ))}
            </div>
          </div>
        </td>
        <td>{categoria.cantPersonas}</td>
        <td>{categoria.fechaAlta}</td>
        <td>
          {categoria.fechaBaja
            ? categoria.fechaBaja
            : "La categoria está activa"}
        </td>
        <td>
          <a
            className="buttonTabla"
            href="#"
            id="boton1"
            onClick={() => cambiarEstado(categoria.id)}
          >
            {categoria.estado === "Activo" ? "Desactivar" : "Activar"}
          </a>
          <a className="buttonTabla" href="#">
            Modificar
          </a>
        </td>
      </tr>
    );
  });
  return (
    <div className="admin-usuarios">
      <h1>CATEGORIAS</h1>
      <div className="panels">
        <div className="usuarios-tabla">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Costo servicios</th>
                <th>Servicios</th>
                <th>Cantidad personas</th>
                <th>Fecha de Creacion</th>
                <th>Fecha de Baja</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>{listaCategorias}</tbody>
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
