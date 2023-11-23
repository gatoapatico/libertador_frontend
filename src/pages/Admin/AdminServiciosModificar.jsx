import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminServiciosModificar({
  cargarServicios,
  id,
  finalizarModificacion,
}) {
  const urlBase = "http://localhost:8080/api/servicios";
  const [servicio, setServicio] = useState({
    nombre: "",
    costo: "",
  });

  const { nombre, costo } = servicio;

  useEffect(() => {
    cargarServicio();
  }, [id]);

  const cargarServicio = async () => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setServicio(resultado.data);
    } catch (error) {
      console.error("Error al cargar el servicio:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  const onInputChange = (e) => {
    setServicio({ ...servicio, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${urlBase}/${id}`, servicio);
    cargarServicios();
    finalizarModificacion();
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
        />
      </div>

      <button type="submit" className="btn-crear-actualizar">
        Actualizar Servicio
      </button>
    </form>
  );
}
