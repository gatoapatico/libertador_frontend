import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminServicios() {
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

  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");

  const servicio = {
    nombre: nombre,
    costo: costo,
    fechaAlta: fechaAlta,
    fechaBaja: null,
    foto: null,
    estado: "Activo",
  };

  function servicioRegistrado(e) {
    e.preventDefault();
    console.log(servicio);

    fetch("http://localhost:8080/api/servicios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(servicio),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        console.log("servicio Agregado!");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
      });
  }
  return (
    <div className="admin-usuarios">
      <h1>SERVICIOS</h1>
      <div className="panels">
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
              <tr>
                <td>1</td>
                <td>DESAYUNO</td>
                <td>45</td>
                <td>2023-11-10</td>
                <td></td>
                <td className="celda-estado">
                  <button>Desactivar</button>
                  <button>Modificar</button>
                </td>
              </tr>
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
                  <td>
                    <a
                      className="buttonTabla"
                      href="#"
                      id="boton1"
                      onClick={() => cambiarEstado(servicio.id)}
                    >
                      {servicio.estado === "Activo" ? "Desactivar" : "Activar"}
                    </a>
                    <a className="buttonTabla" href="#">
                      Modificar
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="usuarios-form">
          <h3>Crea un Servicio</h3>
          <form action="">
            <br></br>
            <div className="input-form">
              <input
                type="text"
                id="txtNombre"
                placeholder="Ingrese el nombre del servicio"
                onChange={(e) => setNombre(e.target.value)}
              />
              {/* <label htmlFor="txtEmail">Email</label> */}
            </div>
            <div className="input-form">
              <input
                type="number"
                id="txtCosto"
                placeholder="Ingrese el costo del servicio"
                onChange={(e) => setCosto(e.target.value)}
              />
            </div>
            <div className="input-form">
              <input
                type="date"
                id="txtFechaAlta"
                placeholder="Ingrese la fecha"
                onChange={(e) => setFechaAlta(e.target.value)}
              />
            </div>

            <button
              className="btn-crear-actualizar"
              onClick={(e) => servicioRegistrado(e)}
            >
              Crear Servicio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
