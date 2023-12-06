import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function AdminCategoriasModificar({
  cargarCategorias,
  id,
  finalizarModificacion,
}) {
  const urlBase = "http://localhost:8080/api/categorias";
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [listaServiciosSeleccionados, setListaServiciosSeleccionados] =
    useState([]);
  const [listaServiciosDeLaCategoria, setListaServiciosDeLaCategoria] =
    useState([]);
  const [listaServiciosTraidos, setListaServiciosTraidos] = useState([]);
  const [categoria, setCategoria] = useState({
    nombre: "",
    cantPersonas: "",
    precioCategoria: "",
    descripcion_breve: "",
    descripcion_larga: "",
  });
  const {
    nombre,
    precioCategoria,
    cantPersonas,
    descripcion_breve,
    descripcion_larga,
  } = categoria;

  useEffect(() => {
    cargarCategoria();
  }, [id]);

  const cargarCategoria = async () => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setCategoria(resultado.data);
      console.log("Resultado cargar categoria", resultado.data);
      cargarServiciosDeLaCategoria(resultado.data.id);
    } catch (error) {
      console.error("Error al cargar la categoria:", error);
    }
  };

  const cargarServiciosDeLaCategoria = async (idCategoria) => {
    try {
      const resultado = await axios.get(`${urlBase}/${idCategoria}/servicios`);
      setListaServiciosDeLaCategoria(resultado.data);
      setListaServiciosSeleccionados(
        resultado.data.map((servicio) => servicio.id.toString())
      );
      console.log("Resultado cargar servicios de la categoría", resultado.data);
    } catch (error) {
      console.error("Error al cargar los servicios de la categoría:", error);
    }
  };

  const onInputChange = (e) => {
    setCategoria({ ...categoria, [e.target.name]: e.target.value });
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

  const retirarServicio = (servicioId) => {
    setListaServiciosSeleccionados((prevServicios) =>
      prevServicios.filter((id) => id !== servicioId)
    );
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
    await axios.put(`${urlBase}/${id}`, categoria);
    await await actualizarCategoriaConServicios(id);
    cargarCategorias();
    finalizarModificacion();
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="input-form">
        <input
          type="text"
          id="txtNombre"
          name="nombre"
          value={nombre}
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
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>

      <div className="input-form">
        <input
          type="number"
          id="txrPrecioCategoria"
          name="precioCategoria"
          value={precioCategoria}
          placeholder="Ingrese el precio de la categoria"
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
      <div className="contenedor-servicios-seleccionados">
        <h4>Servicios seleccionados:</h4>
        <ul>
          {listaServiciosSeleccionados.map((servicioId) => {
            const servicio = listaServiciosTraidos.find(
              (servicio) => servicio.id.toString() === servicioId
            );
            return (
              <li key={servicioId}>
                {servicio && servicio.nombre
                  ? servicio.nombre
                  : "Nombre no disponible"}
                <button className="btn-eliminar-servicio" onClick={() => retirarServicio(servicioId)}>
                  <FaTrashAlt />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <br />
      <br />
      <br />
      <div className="input-form">
        <textarea
          type="text"
          id="txtDescripcionBreve"
          name="descripcion_breve"
          value={descripcion_breve}
          placeholder="Ingrese una breve descripcion de la categoria"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>

      <div className="input-form">
        <textarea
          type="text"
          id="txtDescripcionLarga"
          name="descripcion_larga"
          value={descripcion_larga}
          placeholder="Ingrese una descripcion larga de la categoria"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <button className="btn-crear-actualizar"> Modificar Categoria</button>
    </form>
  );
}
