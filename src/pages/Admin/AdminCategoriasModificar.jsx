import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminCategoriasModificar({
  cargarCategorias,
  id,
  finalizarModificacion,
}) {
  const urlBase = "http://localhost:8080/api/categorias";
  const [servicioSeleccionado, setServicioSeleccionado] = useState("");
  const [listaServiciosSeleccionados, setListaServiciosSeleccionados] =
    useState([]);
  const [listaServiciosTraidos, setListaServiciosTraidos] = useState([]);
  const [categoria, setCategoria] = useState({
    nombre: "",
    cantPersonas: "",
  });
  const { nombre, cantPersonas } = categoria;

  useEffect(() => {
    cargarCategoria();
  }, [id]);

  const cargarCategoria = async () => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setCategoria(resultado.data);
    } catch (error) {
      console.error("Error al cargar la categoria:", error);
    }
  };

  return <div></div>;
}
