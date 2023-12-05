import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminHabitacionesRegistro({ cargarHabitaciones }) {
  const today = new Date().toISOString().split("T")[0];
  const urlBase = "http://localhost:8080/api/habitaciones";
  const [categoriasTraidas, setCategoriasTraidas] = useState([]);
  const [habitaciones, setHabitaciones] = useState({
    numHabitacion: "",
    tipoHabitacion: "",
    estado: "Activo",
    fechaAlta: new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Lima",
    }),
    fechaBaja: null,
  });
  const { numHabitacion, tipoHabitacion, estado, fechaAlta, fechaBaja } =
    habitaciones;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipoHabitacion") {
      // Actualizar tipoHabitacion con el objeto seleccionado
      const categoriaSeleccionada = categoriasTraidas.find(
        (categoria) => categoria.id === parseInt(value, 10)
      );
      setHabitaciones({ ...habitaciones, [name]: categoriaSeleccionada });
    } else {
      setHabitaciones({ ...habitaciones, [name]: value });
    }
  };
  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categorias"
        );
        setCategoriasTraidas(response.data);
      } catch (error) {
        console.error("este es el error:", error);
      }
    }
    fetchCategorias();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(urlBase, habitaciones);
      alert("Habitación registrada exitosamente");
      cargarHabitaciones();
      setHabitaciones({
        numHabitacion: "",
        tipoHabitacion: "",
        estado: "Activo",
        fechaAlta: new Date().toLocaleDateString("en-CA", {
          timeZone: "America/Lima",
        }),
        fechaBaja: null,
      });
    } catch (error) {
      console.error("este es el error:", error);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <br />
      <div className="input-form">
        <input
          type="text"
          className="form-control"
          placeholder="Número de habitación"
          name="numHabitacion"
          value={numHabitacion}
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="input-form">
        <select
          className="form-control"
          name="tipoHabitacion"
          value={tipoHabitacion.id}
          onChange={(e) => onInputChange(e)}
          required
        >
          <option value="">Seleccione una categoría</option>
          {categoriasTraidas.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
      <button className="btn-crear-actualizar"> Crear Habitacion </button>
    </form>
  );
}
