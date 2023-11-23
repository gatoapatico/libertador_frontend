import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminCategoriasRegistro({ cargarCategorias }) {
  const urlBase = "http://localhost:8080/api/categorias";
  const [listaServicios, setListaServicios] = useState([]);
  const [categorias, setCategorias] = useState({
    nombre: "",
    servicios: [],
    cantPersonas: "",
    fechaAlta: "",
    fechaBaja: "null",
    estado: "Activo",
  });
  const { nombre, servicios, cantPersonas, fechaAlta, fechaBaja, estado } =
    categorias;

  const onInputChange = (e) => {
    if (e.target.name === "servicios") {
      const selectedServices = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setCategorias({ ...categorias, servicios: selectedServices });
    } else {
      setCategorias({ ...categorias, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let serviciosCompletos = [];

    for (let id of categorias.servicios) {
      const response = await axios.get(
        `http://localhost:8080/api/servicios/${id}`
      );
      serviciosCompletos.push(response.data.id);
    }

    let categoriasConServiciosCompletos = {
      ...categorias,
      servicios: serviciosCompletos,
    };

    console.log(categoriasConServiciosCompletos);
    await axios.post(urlBase, categoriasConServiciosCompletos);

    cargarCategorias();
  };

  useEffect(() => {
    async function fetchServicios() {
      const response = await axios.get("http://localhost:8080/api/servicios");
      setListaServicios(response.data);
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
            onChange={(e) => onInputChange(e)}
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
