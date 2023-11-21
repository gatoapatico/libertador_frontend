import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminServiciosLista() {
  const urlBase = "http://localhost:8080/api/servicios";
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    cargarServicios();
  }, []);
  const cargarServicios = async () => {
    try {
      const resultado = await axios.get(urlBase);
      console.log("Resultado cargar servicios");
      console.log(resultado.data);
      setServicios(resultado.data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  const cambiarEstado = async (id) => {
    try {
      await axios.put(`${urlBase}/${id}/estado`);
      // Vuelve a cargar los usuarios después de cambiar el estado del servicio
      cargarServicios();
    } catch (error) {
      console.error("Error al cambiar estado del servicio:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  return (
    <div className="usuarios-tabla">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>COSTO</th>
            <th>FECHA DE CREACION</th>
            <th>FECHA DE BAJA</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio) => (
            <tr key={servicio.id}>
              <td>{servicio.id}</td>
              <td>{servicio.nombre}</td>
              <td>S/.{servicio.costo}</td>
              <td>{servicio.fechaAlta}</td>
              <td>
                {servicio.fechaBaja
                  ? servicio.fechaBaja
                  : "El servicio está activo"}
              </td>
              <td className="celda-estado">
                <button onClick={() => cambiarEstado(servicio.id)}>
                  {servicio.estado === "Activo" ? "Desactivar" : "Activar"}
                </button>
                <button>Modificar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
