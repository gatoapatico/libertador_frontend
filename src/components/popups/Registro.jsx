import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";

export default function Registro({ handleExit, openLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");

  const [isFailEmail, setIsFailEmail] = useState(false);
  const [isFailContrasena, setIsFailContrasena] = useState(false);
  const [isFailDni, setIsFailDni] = useState(false);
  const [isFailNombre, setIsFailNombre] = useState(false);
  const [isFailApellido, setIsFailApellido] = useState(false);
  const [isFailTelefono, setIsFailTelefono] = useState(false);

  const [isFail, setIsFail] = useState(false);

  const currentDate = new Date();
  const dateString = dateFormat(currentDate, "yyyy-mm-dd");

  const usuario = {
    email: email,
    contrasena: contrasena,
    dni: dni,
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    fechaAlta: dateString,
    fechaBaja: null,
    tipo: "Cliente",
    estado: "Activo",
  };

  function regexValidation(input, type) {
    let regex;

    switch (type) {
      case "email":
        regex = /^[a-z]+[a-z0-9]*@[a-z]+\.[a-z]{2,3}$/;
        break;
      case "contrasena":
        regex = /^.+$/;
        break;
      case "dni":
        regex = /^[0-9]{8}$/;
        break;
      case "nombre":
        regex = /^[a-zA-Z ]+$/;
        break;
      case "telefono":
        regex = /^[0-9]{4,13}$/;
        break;
    }

    return regex.test(input);
  }

  function userRegister(e) {
    e.preventDefault();

    let readyToAPI = false;

    regexValidation(email, "email")
      ? setIsFailEmail(false)
      : setIsFailEmail(true);
    regexValidation(contrasena, "contrasena")
      ? setIsFailContrasena(false)
      : setIsFailContrasena(true);
    regexValidation(dni, "dni") ? setIsFailDni(false) : setIsFailDni(true);
    regexValidation(nombre, "nombre")
      ? setIsFailNombre(false)
      : setIsFailNombre(true);
    regexValidation(apellido, "nombre")
      ? setIsFailApellido(false)
      : setIsFailApellido(true);
    regexValidation(telefono, "telefono")
      ? setIsFailTelefono(false)
      : setIsFailTelefono(true);

    if (
      regexValidation(email, "email") &&
      regexValidation(contrasena, "contrasena") &&
      regexValidation(dni, "dni") &&
      regexValidation(nombre, "nombre") &&
      regexValidation(apellido, "nombre") &&
      regexValidation(telefono, "telefono")
    ) {
      readyToAPI = true;
    } else {
      console.log("Aún no está listo para subir.");
    }

    if (readyToAPI) {
      registerNewUser();
    }
  }

  function registerNewUser() {
    fetch("http://localhost:8080/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((res) => {
        if (!res.ok) {
          setIsFail(true);
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const userObject = {
          id: data.usuario.id,
          email: data.usuario.email,
          nombre: data.usuario.nombre,
          apellido: data.usuario.apellido,
          dni: data.usuario.dni,
          tipo: data.usuario.tipo,
        };

        window.localStorage.setItem("user", JSON.stringify(userObject));

        handleExit();
        navigate("/");
        window.location.reload();
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
          <div className="input-form">
            <input
              type="email"
              name="txtEmail"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {isFailEmail ? (
              <p className="txt-fail">Formato de email incorrecto!</p>
            ) : (
              ""
            )}
          </div>
          <div className="input-form">
            <input
              type="password"
              name="txtContra"
              placeholder="Password"
              onChange={(e) => setContrasena(e.target.value)}
            />
            {isFailContrasena ? (
              <p className="txt-fail">
                Es obligatorio ingresar una contraseña!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="input-form">
            <input
              type="text"
              name="txtDNI"
              placeholder="Documento de Identidad"
              onChange={(e) => setDni(e.target.value)}
            />
            {isFailDni ? (
              <p className="txt-fail">El formato de DNI es de 8 digitos!</p>
            ) : (
              ""
            )}
          </div>
          <div className="input-form">
            <input
              type="text"
              name="txtNombre"
              placeholder="Nombre"
              onChange={(e) => setNombre(e.target.value)}
            />
            {isFailNombre ? (
              <p className="txt-fail">
                El formato de nombre solo acepta letras!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="input-form">
            <input
              type="text"
              name="txtApellido"
              placeholder="Apellido"
              onChange={(e) => setApellido(e.target.value)}
            />
            {isFailApellido ? (
              <p className="txt-fail">
                El formato de apellido solo acepta letras!
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="input-form">
            <input
              type="text"
              name="txtTelefono"
              placeholder="Teléfono"
              onChange={(e) => setTelefono(e.target.value)}
            />
            {isFailTelefono ? (
              <p className="txt-fail">
                El formato de telefono es entre 4 y 13 digitos!
              </p>
            ) : (
              ""
            )}
          </div>
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
        {isFail ? (
          <h4 className="txt-fail-all">
            Ya existe un usuario<br></br> con el correo ingresado!
          </h4>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
