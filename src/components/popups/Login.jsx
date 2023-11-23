import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ handleExit, openRegistro }) {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const navigate = useNavigate();

  function userlogin(e) {
    e.preventDefault();
    const usuario = { email, contrasena };

    fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.tipo === "Recepcionista") {
          navigate("/recepcionista", { replace: true });
        } else if (data.tipo === "Administrador") {
          navigate("/Admin", { replace: true });
        } else {
          console.error("Invalid user type:", data.tipo);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }

  return (
    <div className="popup-login">
      <div className="login-details"></div>
      <div className="login-user">
        <span className="btn-exit" onClick={handleExit}>
          X
        </span>
        <h2>Iniciar sesión</h2>
        <form className="login-form">
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
          <button type="submit" onClick={(e) => userlogin(e)}>
            Iniciar Sesión
          </button>
        </form>
        <p className="no-account">
          ¿No tienes cuenta?
          <span className="btn-registrate" onClick={openRegistro}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}
