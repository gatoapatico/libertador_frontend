import axios from "axios";
import { useState } from "react";

export default function AdminServiciosRegistro({ cargarServicios }) {
  const urlBase = "http://localhost:8080/api/servicios";
  const [servicio, setServicio] = useState({
    nombre: "",
    costo: "",
    fechaAlta: "",
    fechaBaja: "null",
    estado: "Activo",
  });

  const { nombre, costo, fechaAlta, fechaBaja, estado } = servicio;

  const onInputChange = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };

  const reiniciarFormulario = () => {
    setServicio({
      nombre: "",
      costo: "",
      fechaAlta: "",
      fechaBaja: "null",
      estado: "Activo",
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(urlBase, servicio);
    cargarServicios();
    reiniciarFormulario();
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <br></br>
      <div className="input-form">
        <input
          type="text"
          id="txtNombre"
          name="nombre"
          value={nombre}
          placeholder="Ingrese el nombre del servicio"
          onChange={(e) => onInputChange(e)}
          required
        />
        {/* <label htmlFor="txtEmail">Email</label> */}
      </div>
      <div className="input-form">
        <input
          type="number"
          id="txtCosto"
          name="costo"
          value={costo}
          placeholder="Ingrese el costo del servicio"
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
          placeholder="Ingrese la fecha"
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>

      <button type="submit" className="btn-crear-actualizar">
        Crear Servicio
      </button>
    </form>
  );
}
