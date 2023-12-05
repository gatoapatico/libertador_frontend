import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminCategoriasRegistro({ cargarCategorias }) {
  const today = new Date().toISOString().split("T")[0];
  const urlBase = "http://localhost:8080/api/categorias";
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [listaServiciosSeleccionados, setListaServiciosSeleccionados] =
    useState([]);
  const [listaServiciosTraidos, setListaServiciosTraidos] = useState([]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null); // Nuevo estado para el archivo
  const [categorias, setCategorias] = useState({
    nombre: "",
    cantPersonas: "",
    precioCategoria: "",
    fechaAlta: new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Lima",
    }),
    descripcion_breve: "",
    descripcion_larga: "",
    fechaBaja: null,
    estado: "Activo",
  });

  const {
    nombre,
    cantPersonas,
    precioCategoria,
    fechaAlta,
    descripcion_breve,
    descripcion_larga,
    fechaBaja,
    estado,
  } = categorias;

  const onInputChange = (e) => {
    // Verifica si el input es de tipo "file" y maneja el archivo seleccionado
    if (e.target.type === "file") {
      setArchivoSeleccionado(e.target.files[0]);
    } else {
      // Maneja otros cambios de input
      setCategorias({ ...categorias, [e.target.name]: e.target.value });
    }
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

  const subirArchivo = async (categoriaId) => {
    const formData = new FormData();
    formData.append("archivo", archivoSeleccionado);
    formData.append("tipoEntidad", "categoria");
    formData.append("idEntidad", categoriaId);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/archivo/subir",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.nombreArchivo; // o ajusta según lo que devuelve tu API
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoriaId = await crearCategoria();
      await actualizarCategoriaConServicios(categoriaId);
      if (archivoSeleccionado) {
        await subirArchivo(categoriaId);
      }
      cargarCategorias();
      setListaServiciosSeleccionados([]);
      setCategorias({
        nombre: "",
        cantPersonas: "",
        precioCategoria: "",
        fechaAlta: new Date().toLocaleDateString("en-CA", {
          timeZone: "America/Lima",
        }),
        descripcion_breve: "",
        descripcion_larga: "",
        fechaBaja: null,
        estado: "Activo",
      });
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
      <div>
        <h4>Servicios seleccionados:</h4>
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
      <div className="input-form">
        <input
          type="file"
          id="txtArchivo"
          name="archivo"
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <button className="btn-crear-actualizar"> crear Categoria</button>
    </form>
  );
}
