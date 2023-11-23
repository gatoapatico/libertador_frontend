import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsuariosModificar({ id, cargarUsuarios }) {
  const urlBase = "http://localhost:8080/api/usuarios";
  const [usuario, setUsuario] = useState({
    email: "",
    contrasena: "",
    nombre: "",
    apellido: "",
    telefono: "",
    tipo: "",
  });

  const { email, contrasena, nombre, apellido, telefono, tipo } = usuario;

  useEffect(() => {
    cargarUsuario();
  }, [id]);

  const cargarUsuario = async () => {
    try {
      const resultado = await axios.get(`${urlBase}/${id}`);
      setUsuario(resultado.data);
    } catch (error) {
      console.error("Error al cargar el usuario:", error);
      // Puedes agregar un mensaje de error o alguna lógica de manejo aquí
    }
  };

  const onInputChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleTelefonoChange = (e) => {
    const newTelefono = e.target.value.replace(/[^0-9]/g, "").substring(0, 9);
    setUsuario({ ...usuario, telefono: newTelefono });
  };
  const onTipoChange = (e) => {
    setUsuario({ ...usuario, tipo: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${urlBase}/${id}`, usuario);
    cargarUsuarios();
    setUsuario({
      email: "",
      contrasena: "",
      nombre: "",
      apellido: "",
      telefono: "",
      tipo: "",
    });
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
      <button type="submit" className="btn-crear-actualizar">
        Modificar Usuario
      </button>
    </form>
  );
}
