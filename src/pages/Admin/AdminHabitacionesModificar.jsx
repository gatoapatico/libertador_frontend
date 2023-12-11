import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminHabitacionesModificar({
  cargarHabitaciones,
  id,
  finalizarModificacion,
}) {
  const urlBase = "http://localhost:8080/api/habitaciones";
  const [categoriasTraidas, setCategoriasTraidas] = useState([]);
  const [habitacion, setHabitacion] = useState({
    numHabitacion: "",
    tipoHabitacion: "",
  });
  const { numHabitacion, tipoHabitacion } = habitacion;

  useEffect(() => {
    cargarHabitacion();
  }, [id]);

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

  const cargarHabitacion = async () => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setHabitacion(resultado.data);
    } catch (error) {
      console.error("Error al cargar la habitación:", error);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipoHabitacion") {
      // Actualizar tipoHabitacion con el objeto seleccionado
      const categoriaSeleccionada = categoriasTraidas.find(
        (categoria) => categoria.id === parseInt(value, 10)
      );
      setHabitacion({ ...habitacion, [name]: categoriaSeleccionada });
    } else {
      setHabitacion({ ...habitacion, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${urlBase}/${id}`, habitacion);
    cargarHabitaciones();
    finalizarModificacion();
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
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
      <button className="btn-crear-actualizar"> Modificar Habitación </button>
    </form>
  );
}
