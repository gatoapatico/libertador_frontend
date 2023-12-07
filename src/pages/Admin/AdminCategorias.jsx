import { useEffect, useState } from "react";
import axios from "axios";
import AdminCategoriasRegistro from "./AdminCategoriasRegistro";
import AdminCategoriasModificar from "./AdminCategoriasModificar";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
export default function AdminCategorias() {
  const [isOpenSection, setIsOpenSection] = useState(false);

  const urlBase = "http://localhost:8080/api/categorias";
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [isModifying, setIsModifying] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    cargarCategorias();
  }, [currentPage]);

  function openSection() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpenSection((prev) => !prev);
  }

  const cargarCategorias = async () => {
    try {
      const resultado = await axios.get(`${urlBase}/page/${currentPage}`);
      console.log("Resultado cargar servicios");
      console.log(resultado.data);
      setCategorias(resultado.data.content); // Asegúrate de que tu backend devuelve los datos en una propiedad 'content'
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
      // Vuelve a cargar las categorías después de cambiar el estado
      cargarCategorias();
    } catch (error) {
      console.error("Error al cambiar estado de la categoría:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  const modificarCategoria = async (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpenSection(true);

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
        <td className="id">{categoria.id}</td>
        <td>{categoria.nombre}</td>
        <td>
          {categoria.foto[0] ? (
            <img
              src={`https://hotel-libetador.s3.us-east-2.amazonaws.com/${categoria.foto[0].nombre}`}
              alt=""
            />
          ) : (
            "No Image"
          )}
        </td>
        <td>{categoria.descripcion_breve}</td>
        <td className="descripcion-larga">{categoria.descripcion_larga}</td>
        <td>{categoria.precioCategoria}</td>
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
        <td>
          {categoria.fechaBaja
            ? categoria.fechaBaja
            : "La categoria está activa"}
        </td>
        <td className="celda-estado">
          <div className="botones-celda">
            <button onClick={() => cambiarEstado(categoria.id)}>
              {categoria.estado === "Activo" ? "Desactivar" : "Activar"}
            </button>
            <button onClick={() => modificarCategoria(categoria.id)}>
              Modificar
            </button>
          </div>
        </td>
      </tr>
    );
  });
  return (
    <div className="admin-usuarios">
      <h1>CATEGORIAS</h1>
      <button className="btn-abrir-seccion" onClick={openSection}>
        {isOpenSection ? "Cerrar Sección" : "Crear Nueva Categoría"}
      </button>
      <div className="panels">
        {isOpenSection ? (
          isModifying || isCreating ? (
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
                <button className="btn-ir-crear" onClick={crearCategoria}>
                  Ir a crear categoria
                </button>
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
          )
        ) : (
          ""
        )}

        <div className="usuarios-tabla">
          <table>
            <thead>
              <tr>
                <th className="id">ID</th>
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Descripcion corta</th>
                <th>Descripcion larga</th>
                <th>Costo categoria</th>
                <th>Servicios</th>
                <th>Cantidad personas</th>
                <th>Fecha de Baja</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>{listaCategorias}</tbody>
          </table>
          <button className="btn-paginacion" onClick={prevPage}>
            <MdNavigateBefore /> Página anterior
          </button>
          <button className="btn-paginacion" onClick={nextPage}>
            Página siguiente <MdNavigateNext />
          </button>
        </div>
      </div>
    </div>
  );
}
