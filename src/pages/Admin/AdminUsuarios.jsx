import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsuarios() {
  const urlBase = "http://localhost:8080/api/usuarios";
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);
  const cargarUsuarios = async () => {
    try {
      const resultado = await axios.get(urlBase);
      console.log("Resultado cargar usuarios");
      console.log(resultado.data);
      setUsuarios(resultado.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  const cambiarEstado = async (id) => {
    try {
      await axios.put(`${urlBase}/${id}/estado`);
      // Vuelve a cargar los usuarios después de cambiar el estado del servicio
      cargarUsuarios();
    } catch (error) {
      console.error("Error al cambiar estado del usuario:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };
  /*function handleForm(e) {
    e.preventDefault();
  }*/

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");

  const usuario = {
    email: email,
    contrasena: contrasena,
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    fechaAlta: fechaAlta,
    fechaBaja: null,
    foto: "juan.jpg",
    tipo: selectedTipo,
    estado: "Activo",
  };

  function userRegister(e) {
    e.preventDefault();
    console.log(usuario);

    fetch("http://localhost:8080/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        console.log("usuario Agregado!");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
      });
    cargarUsuarios();
  }
  const handleDniChange = (e) => {
    const newDni = e.target.value.replace(/[^0-9]/g, "").substring(0, 8);
    setDni(newDni);
  };
  const handleTelefonoChange = (e) => {
    const newTelefono = e.target.value.replace(/[^0-9]/g, "").substring(0, 9);
    setTelefono(newTelefono);
  };
  return (
    <div className="admin-usuarios">
      <h1>USUARIOS</h1>
      <div className="panels">
        <div className="usuarios-tabla">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th>CONTRASENA</th>
                <th>DNI</th>
                <th>NOMBRE</th>
                <th>APELLIDOS</th>
                <th>TELEFONO</th>
                <th>TIPO</th>
                <th>FECHA DE CREACION</th>
                <th>FECHA DE BAJA</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.contrasena}</td>
                  <td>{usuario.dni}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.tipo}</td>
                  <td>{usuario.fechaAlta}</td>
                  <td>
                    {usuario.fechaBaja
                      ? usuario.fechaBaja
                      : "El usuario esta activo"}
                  </td>
                  <td>
                    <a
                      className="celda-estado"
                      href="#"
                      id="boton1"
                      onClick={() => cambiarEstado(usuario.id)}
                    >
                      {usuario.estado === "Activo" ? "Desactivar" : "Activar"}
                    </a>
                    <a className="celda-estado" href="#">
                      Modificar
                    </a>
                  </td>
                </tr>
              ))}

              <tr>
                <td>1</td>
                <td>laura.perez@example.com</td>
                <td>pass123</td>
                <td>87654321</td>
                <td>Laura</td>
                <td>Pérez</td>
                <td>987456321</td>
                <td>Cliente</td>
                <td>2023-10-01</td>
                <td>El usuario está activo</td>
                <td className="celda-estado">
                  <button>Desactivar</button>
                  <button>Modificar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="usuarios-form">
          <h3>Crea-Modifica Usuarios</h3>
          <form action="">
            <br></br>
            <div className="input-form">
              <input
                type="text"
                id="txtEmail"
                placeholder="Ingrese un email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* <label htmlFor="txtEmail">Email</label> */}
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtContrasena"
                placeholder="Ingrese una contraseña"
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtDni"
                placeholder="Ingrese un número de dni"
                value={dni}
                onChange={handleDniChange}
                maxLength={8}
                required
              />
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtNombre"
                placeholder="Ingrese un nombre"
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtApellido"
                placeholder="Ingrese un apellido"
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
            <div className="input-form">
              <input
                type="text"
                id="txtTelefono"
                placeholder="Ingrese un número de teléfono"
                onChange={handleTelefonoChange}
                maxLength={9}
                required
              />
            </div>
            <div className="input-form">
              <select
                id="txtTipo"
                required
                value={selectedTipo} // Usa el estado para el valor seleccionado
                onChange={(e) => setSelectedTipo(e.target.value)}
              >
                <option value="" disabled>
                  Seleccione el tipo usuario
                </option>
                <option value="Cliente">Cliente</option>
                <option value="Administrador">Administrador</option>
                <option value="Recepcionista">Recepcionista</option>
              </select>
            </div>
            <div className="input-form">
              <input
                type="Date"
                id="txtFechaAlta"
                placeholder="Ingrese la fecha de creacion"
                onChange={(e) => setFechaAlta(e.target.value)}
                required
              />
            </div>
            <button
              className="btn-crear-actualizar"
              onClick={(e) => userRegister(e)}
            >
              Crear Usuario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
