import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminUsuariosRegistro({ cargarUsuarios }) {
  const urlBase = "http://localhost:8080/api/usuarios";
  const [usuario, setUsuario] = useState({
    email: "",
    contrasena: "",
    dni: "",
    nombre: "",
    apellido: "",
    telefono: "",
    fechaAlta: "",
    fechaBaja: "null",
    tipo: "",
    foto: "null",
    estado: "Activo",
  });

  const {
    email,
    contrasena,
    dni,
    nombre,
    apellido,
    telefono,
    fechaAlta,
    fechaBaja,
    tipo,
    foto,
    estado,
  } = usuario;

  const onInputChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleDniChange = (e) => {
    const newDni = e.target.value.replace(/[^0-9]/g, "").substring(0, 8);
    setUsuario({ ...usuario, dni: newDni });
  };

  const handleTelefonoChange = (e) => {
    const newTelefono = e.target.value.replace(/[^0-9]/g, "").substring(0, 9);
    setUsuario({ ...usuario, telefono: newTelefono });
  };
  const onTipoChange = (e) => {
    setUsuario({ ...usuario, tipo: e.target.value });
  };

  const reiniciarFormulario = () => {
    setUsuario({
      email: "",
      contrasena: "",
      dni: "",
      nombre: "",
      apellido: "",
      telefono: "",
      fechaAlta: "",
      fechaBaja: "null",
      tipo: "",
      foto: "null",
      estado: "Activo",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(urlBase, usuario);
    cargarUsuarios();
    reiniciarFormulario();
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <br></br>
      <div className="input-form">
        <input
          type="text"
          id="txtEmail"
          name="email"
          placeholder="Ingrese un email"
          value={email}
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="input-form">
        <input
          type="text"
          id="txtContrasena"
          name="contrasena"
          placeholder="Ingrese una contraseña"
          value={contrasena}
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="input-form">
        <input
          type="text"
          id="txtDni"
          name="dni"
          placeholder="Ingrese un número de dni"
          value={dni}
          onChange={(e) => handleDniChange(e)}
          maxLength={8}
          required
        />
      </div>
      <div className="input-form">
        <input
          type="text"
          id="txtNombre"
          name="nombre"
          placeholder="Ingrese un nombre"
          value={nombre}
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="input-form">
        <input
          type="text"
          id="txtApellido"
          name="apellido"
          placeholder="Ingrese un apellido"
          value={apellido}
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <div className="input-form">
        <input
          type="text"
          id="txtTelefono"
          name="telefono"
          placeholder="Ingrese un número de teléfono"
          value={telefono}
          onChange={(e) => handleTelefonoChange(e)}
          maxLength={9}
          required
        />
      </div>
      <div className="input-form">
        <select
          id="txtTipo"
          name="selectedTipo"
          required
          value={tipo}
          onChange={(e) => onTipoChange(e)}
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
          name="fechaAlta"
          placeholder="Ingrese la fecha de creacion"
          value={fechaAlta}
          onChange={(e) => onInputChange(e)}
          required
        />
      </div>
      <button type="submit" className="btn-crear-actualizar">
        Crear Usuario
      </button>
    </form>
  );
}
