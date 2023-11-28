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
    fechaBaja: null,
    estado: "Activo",
  });
  const { nombre, cantPersonas, fechaAlta, fechaBaja, estado } = categorias;

  const onInputChange = (e) => {
    setCategorias({ ...categorias, [e.target.name]: e.target.value });
  };

  const onServicioChange = (e) => {
    const servicioId = e.target.value;
    setServicios([...servicios, servicioId]);
  };

  const agregarServicio = () => {
    setServicios([...new Set(servicios)]);
  };
  console.log("Servicios:", servicios);

  const onSubmit = async (e) => {
    try {
      const responseCategoria = await axios.post(urlBase, categorias);

      const responseCategoriaId = await axios.get(
        "http://localhost:8080/api/categorias/maxId"
      );
      const categoriaId = responseCategoriaId.data.id;

      const selectedServicios = listaServicios.filter((servicio) =>
        servicios.includes(servicio.id.toString())
      );
      const idsServicios = selectedServicios.map((servicio) => servicio.id);

      await axios.put(
        `http://localhost:8080/api/categorias/${categoriaId}/servicios`,
        idsServicios
      );

      console.log("Categoría creada y actualizada con servicios.");
      cargarCategorias();
    } catch (error) {
      console.error("Error al crear y actualizar la categoría:", error);
    }
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
            onChange={onServicioChange}
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
