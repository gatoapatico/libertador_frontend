import axios from "axios";
import { useState } from "react";

export default function AdminUsuariosRegistro({ cargarUsuarios }) {
  const urlBase = "http://localhost:8080/api/usuarios";
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [usuario, setUsuario] = useState({
    email: "",
    contrasena: "",
    dni: "",
    nombre: "",
    apellido: "",
    telefono: "",
    fechaAlta: new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Lima",
    }),
    fechaBaja: "null",
    tipo: "",
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
    estado,
  } = usuario;
  //IdUsuario
  const onInputChange = (e) => {
    if (e.target.type === "file") {
      setArchivoSeleccionado(e.target.files[0]);
    } else {
      setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }
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
      fechaAlta: new Date().toLocaleDateString("en-CA", {
        timeZone: "America/Lima",
      }),
      fechaBaja: "null",
      tipo: "",
      foto: "null",
      estado: "Activo",
    });
  };

  const crearUsuario = async () => {
    const regex = /^[a-zA-Z0-9]+@\S+\.\S+/;
    if (!regex.test(email)) {
      alert("Por favor, ingresa un correo de Gmail válido");
      return;
    }
    const response = await axios.post(urlBase, usuario);
    return response.data.IdUsuario;
  };
  const subirArchivo = async (usuarioId) => {
    const formData = new FormData();
    formData.append("archivo", archivoSeleccionado);
    formData.append("tipoEntidad", "usuario");
    formData.append("idEntidad", usuarioId);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const usuarioId = await crearUsuario();
    if (archivoSeleccionado) {
      await subirArchivo(usuarioId);
    }

    cargarUsuarios();
    reiniciarFormulario();
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
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
          type="password"
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
          type="file"
          id="txtArchivo"
          name="archivo"
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <button type="submit" className="btn-crear-actualizar">
        Crear Usuario
      </button>
    </form>
  );
}
