import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminCategoriasPrueba({ cargarCategorias }) {
  const urlBase = "http://localhost:8080/api/categorias";
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [listaServiciosSeleccionados, setListaServiciosSeleccionados] =
    useState([]);
  const [listaServiciosTraidos, setListaServiciosTraidos] = useState([]);
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
    if (!listaServiciosSeleccionados.includes(servicioId)) {
      setListaServiciosSeleccionados((prevServicios) => [
        ...prevServicios,
        servicioId,
      ]);
    } else {
      alert("Este servicio ya ha sido agregado a la lista.");
    }
  };

  const agregarServicio = () => {
    setListaServiciosSeleccionados([...new Set(listaServiciosSeleccionados)]);
  };

  useEffect(() => {
    async function fetchServicios() {
      try {
        const response = await axios.get("http://localhost:8080/api/servicios");
        setListaServiciosTraidos(response.data);
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
      }
    }
    fetchServicios();
  }, []);

  const crearCategoria = async () => {
    const response = await axios.post(urlBase, categorias);
    return response.data.idCategoria; // Asegúrate de que tu API devuelva el ID de la categoría recién creada
  };

  const actualizarCategoriaConServicios = async (categoriaId) => {
    const selectedServicios = listaServiciosTraidos.filter((servicio) =>
      listaServiciosSeleccionados.includes(servicio.id.toString())
    );
    const idsServicios = selectedServicios.map((servicio) => servicio.id);

    await axios.put(
      `http://localhost:8080/api/categorias/${categoriaId}/servicios`,
      idsServicios
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Primero, crea la categoría
      const categoriaId = await crearCategoria();

      // Luego, una vez que la categoría se ha creado, actualízala con los servicios
      await actualizarCategoriaConServicios(categoriaId);

      console.log("Categoría creada y actualizada con servicios.");
      cargarCategorias();

      // Vacía la lista de servicios seleccionados
      setListaServiciosSeleccionados([]);
    } catch (error) {
      console.error("Error al crear y actualizar la categoría:", error);
    }
  };
  const retirarServicio = (servicioId) => {
    setListaServiciosSeleccionados((prevServicios) =>
      prevServicios.filter((id) => id !== servicioId)
    );
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <br />
      <div className="input-form">
        <input
          type="text"
          id="txtNombre"
          name="nombre"
          value={nombre}
          placeholder="Ingrese el nombre de la categoría"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="input-form">
        <input
          type="number"
          id="txtCantPersonas"
          name="cantPersonas"
          value={cantPersonas}
          placeholder="Ingrese la cantidad de personas"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="input-form">
        <input
          type="date"
          id="txtFechaAlta"
          name="fechaAlta"
          value={fechaAlta}
          placeholder="Ingrese la fecha de alta"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="input-form">
        <select
          id="txtServicios"
          name="servicios"
          value={servicioSeleccionado}
          onChange={onServicioChange}
        >
          <option value="" disabled>
            Seleccione los servicios
          </option>
          {listaServiciosTraidos.map((servicio) => (
            <option key={servicio.id} value={servicio.id}>
              {servicio.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3>Servicios seleccionados:</h3>
        <ul>
          {listaServiciosSeleccionados.map((servicioId) => {
            const servicio = listaServiciosTraidos.find(
              (servicio) => servicio.id.toString() === servicioId
            );
            return (
              <li key={servicioId}>
                {servicio.nombre}
                <button onClick={() => retirarServicio(servicioId)}>
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="btn-crear-actualizar"> crear Categoria</button>
    </form>
  );
}
