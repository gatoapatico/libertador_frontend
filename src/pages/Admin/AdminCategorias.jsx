import { useEffect, useState } from "react";
import axios from "axios";
import AdminCategoriasRegistro from "./AdminCategoriasRegistro";
import AdminCategoriasModificar from "./AdminCategoriasModificar";
export default function AdminCategorias() {
  const urlBase = "http://localhost:8080/api/categorias";
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
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
  const modificarCategoria = async (id) => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setCategoriaSeleccionada(resultado.data); // Establece el usuario seleccionado con los datos obtenidos
      setIsModifying(true);
      setIsCreating(false); // Establece que estamos en modo de modificación
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  const crearCategoria = () => {
    setIsCreating(true);
    setCategoriaSeleccionada(null); // Restablece el usuario seleccionado al crear uno nuevo
    setIsModifying(false); // Asegúrate de que estás en modo de creación y no modificación
  };

  const finalizarModificacion = () => {
    setIsModifying(false);
    setIsCreating(true);
  };
  const listaCategorias = categorias.map((categoria) => {
    return (
      <tr key={categoria.id}>
        <td>{categoria.id}</td>
        <td>{categoria.nombre}</td>
        <td>{categoria.descripcion_breve}</td>
        <td>{categoria.descripcion_larga}</td>
        <td>{categoria.costoTotalCategoria}</td>
        <td>{categoria.precioCategoria}</td>
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
        <td className="celda-estado">
          <button onClick={() => cambiarEstado(categoria.id)}>
            {categoria.estado === "Activo" ? "Desactivar" : "Activar"}
          </button>
          <button onClick={() => modificarCategoria(categoria.id)}>
            Modificar
          </button>
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
                <th>Descripcion corta</th>
                <th>Descripcion larga</th>
                <th>Costo total</th>
                <th>Costo categoria</th>
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
        {isModifying || isCreating ? (
          <div className="usuarios-form">
            <h3>{isModifying ? "Modificar Categoria" : "Crear Categoria"}</h3>
            {isModifying && (
              <AdminCategoriasModificar
                id={categoriaSeleccionada.id}
                cargarCategorias={cargarCategorias}
                finalizarModificacion={finalizarModificacion}
              />
            )}
            {isModifying && (
              <button onClick={cargarCategorias}>Crear Categoria</button>
            )}
            {isCreating && (
              <AdminCategoriasRegistro cargarCategorias={cargarCategorias} />
            )}
          </div>
        ) : (
          <div className="usuarios-form">
            <h3>Crear Categoria</h3>
            <AdminCategoriasRegistro cargarCategorias={cargarCategorias} />
          </div>
        )}
      </div>
    </div>
  );
}
