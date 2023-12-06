import axios from "axios";
import { useState } from "react";

export default function AdminServiciosRegistro({ cargarServicios }) {
  const urlBase = "http://localhost:8080/api/servicios";
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [servicio, setServicio] = useState({
    nombre: "",
    costo: "",
    fechaAlta: new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Lima",
    }),
    fechaBaja: "null",
    estado: "Activo",
  });

  const { nombre, costo, fechaAlta, fechaBaja, estado } = servicio;

  const onInputChange = (e) => {
    if (e.target.type === "file") {
      setArchivoSeleccionado(e.target.files[0]);
    } else {
      setServicio({ ...servicio, [e.target.name]: e.target.value });
    }
  };

  const reiniciarFormulario = () => {
    setServicio({
      nombre: "",
      costo: "",
      fechaAlta: new Date().toLocaleDateString("en-CA", {
        timeZone: "America/Lima",
      }),
      fechaBaja: "null",
      estado: "Activo",
    });
  };

  const subirArchivo = async (servicioId) => {
    const formData = new FormData();
    formData.append("archivo", archivoSeleccionado);
    formData.append("tipoEntidad", "servicio");
    formData.append("idEntidad", servicioId);
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
  const crearServicio = async () => {
    const response = await axios.post(urlBase, servicio);
    return response.data.servicioId;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const servicioId = await crearServicio();
      if (archivoSeleccionado) {
        await subirArchivo(servicioId);
      }
      cargarServicios();
      reiniciarFormulario();
    } catch (error) {
      console.error("Error al crear el servicio:", error);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
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
          type="file"
          id="txtArchivo"
          name="archivo"
          onChange={(e) => onInputChange(e)}
        />
      </div>

      <button type="submit" className="btn-crear-actualizar">
        Crear Servicio
      </button>
    </form>
  );
}
