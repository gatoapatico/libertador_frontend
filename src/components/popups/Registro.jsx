import { useState } from "react";

export default function Registro({ handleExit, openLogin }) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  const usuario = {
    email: email,
    contrasena: contrasena,
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    fechaAlta: "2023-11-16",
    fechaBaja: null,
    tipo: "Cliente",
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
  }

  return (
    <div className="popup-registro">
      <div className="registro-details"></div>
      <div className="registro-user">
        <span className="btn-exit" onClick={handleExit}>
          X
        </span>
        <h2>Registro</h2>
        <form className="registro-form">
          <input
            type="email"
            name="txtEmail"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="txtContra"
            placeholder="Password"
            onChange={(e) => setContrasena(e.target.value)}
          />
          <input
            type="text"
            name="txtDNI"
            placeholder="Documento de Identidad"
            onChange={(e) => setDni(e.target.value)}
          />
          <input
            type="text"
            name="txtNombre"
            placeholder="Nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            name="txtApellido"
            placeholder="Apellido"
            onChange={(e) => setApellido(e.target.value)}
          />
          <input
            type="text"
            name="txtTelefono"
            placeholder="Teléfono"
            onChange={(e) => setTelefono(e.target.value)}
          />
          <button type="submit" onClick={(e) => userRegister(e)}>
            Regístrate
          </button>
        </form>
        <p className="no-account">
          ¿Ya eres parte de nosotros?
          <span className="btn-login" onClick={openLogin}>
            Inicia Sesión
          </span>
        </p>
      </div>
    </div>
  );
}
