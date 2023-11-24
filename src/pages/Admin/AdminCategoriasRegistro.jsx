import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminCategoriasRegistro({ cargarCategorias }) {
  const urlBase = "http://localhost:8080/api/categorias";
  const [servicios, setServicios] = useState([]);
  const [listaServicios, setListaServicios] = useState([]);
  const [categorias, setCategorias] = useState({
    nombre: "",
    cantPersonas: "",
    fechaAlta: "",
    fechaBaja: "null",
    estado: "Activo",
  });
  const { nombre, cantPersonas, fechaAlta, fechaBaja, estado } = categorias;

  const onInputChange = (e) => {
    setCategorias({ ...categorias, [e.target.name]: e.target.value });
  };

  const onServiciosChange = (e) => {
    const selectedServicios = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setServicios(selectedServicios);
  };
  console.log("Servicios:", servicios);

  const onSubmit = async (e) => {
    const response = await axios.post(urlBase, categorias);
    console.log("Categoría creada:", response.data);

    const responseCategoria = await axios.get(
      `http://localhost:8080/api/categorias/nombre/${categorias.nombre}`
    );
    const categoriaId = responseCategoria.data.id;

    console.log("Categoría ID:", categoriaId);
    console.log("Servicios:", servicios);

    await axios.put(
      `http://localhost:8080/api/categorias/${categoriaId}/servicios`,
      servicios
    );

    console.log("Categoría actualizada con servicios.");

    cargarCategorias();
  };

  useEffect(() => {
    async function fetchServicios() {
      try {
        const response = await axios.get("http://localhost:8080/api/servicios");
        setListaServicios(response.data);
      } catch (error) {
        console.error("Error fetching servicios:", error);
      }
    }

    fetchServicios();
  }, []);

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <br></br>
      <div className="input-form">
        <input
          type="text"
          id="txtNombre"
          placeholder="Ingrese un nombre"
          value={nombre}
          name="nombre"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="input-form">
        <input
          type="text"
          id="txtCantidad"
          name="cantPersonas"
          value={cantPersonas}
          onChange={(e) => onInputChange(e)}
          placeholder="Ingrese cantidad de personas que tendra la categoria"
          required
        />
      </div>
      <div className="input-form">
        <div className="input-form">
          <select
            id="txtServicios"
            name="servicios"
            required
            value={servicios}
            onChange={onServiciosChange}
            multiple
          >
            <option value="" disabled>
              Seleccione los servicios
            </option>
            {listaServicios.map((servicio) => (
              <option key={servicio.id} value={servicio.id}>
                {servicio.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="input-form">
        <input
          type="Date"
          id="txtFechaAlta"
          name="fechaAlta"
          placeholder="Ingrese la fecha de creacion"
          value={fechaAlta}
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <button className="btn-crear-actualizar">Crear Categoria</button>
    </form>
  );
}
