import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import NiubizPayout from "../../components/popups/NiubizPayout";
import { v4 as uuidv4 } from "uuid";

export default function Pago() {
  const [startDate, setStartDate, endDate, setEndDate, user, openLogin] =
    useOutletContext();

  const DATE_FORMAT = "dddd d, mmmm yyyy";

  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;
  const { checkIn, checkOut, categoria } = state;

  const [tiempo, setTiempo] = useState(900);

  const [isNiubizPop, setIsNiubizPop] = useState(false);

  let codigoReserva;
  const pagoTotal = (
    categoria.costoTotalCategoria +
    categoria.costoTotalCategoria * 0.18
  ).toFixed(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setTiempo((prevTiempo) => (prevTiempo > 0 ? prevTiempo - 1 : prevTiempo));
    }, 1000);
  }, []);

  function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, "0")}:${String(
      segundosRestantes
    ).padStart(2, "0")}`;
  }

  if (tiempo === 0) {
    navigate("/reserva");
  }

  function openNiubizPopup() {
    setIsNiubizPop(true);
  }

  function closeNiubizPopup() {
    setIsNiubizPop(false);
  }

  function handlePago() {
    codigoReserva = uuidv4().split("-")[0];
    const reservaObjeto = {
      usuario: {
        id: user.id,
      },
      fechaReserva: dateFormat(new Date(), "yyyy-mm-dd"),
      codigoReserva: codigoReserva,
    };

    const habitacionLibre = categoria.habitaciones.filter(
      (habitacion) =>
        !habitacion.fechasReservadas.includes(dateFormat(checkIn, "yyyy-mm-dd"))
    )[0];

    fetch("http://localhost:8080/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservaObjeto),
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Falló en el fetch de creacion de reserva!");
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const reservaID = data.idReserva;

        const detalleObjeto = {
          checkIn: dateFormat(checkIn, "yyyy-mm-dd"),
          chackOut: dateFormat(checkOut, "yyyy-mm-dd"),
          habitaciones: {
            id: habitacionLibre.id,
          },
          reserva: {
            id: data.idReserva,
          },
        };

        fetch("http://localhost:8080/api/detalles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(detalleObjeto),
        })
          .then((res) => {
            if (!res.ok) {
              console.log("Falló en el fetch de creacion de detalle reserva!");
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log("Creación de detalle reserva con exito!");
            envioMensaje();
            const objeto = {
              checkIn: checkIn,
              checkOut: checkOut,
              categoria: { ...categoria },
              idReserva: reservaID,
            };
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/boleta-reserva", { state: objeto });
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
  const envioMensaje = () => {
    const data = {
      toUser: [user.email],
      subject: "Reserva Hotel",
      message: `Reserva Hotel
                Estimado ${user.nombre} ${user.apellido},
                Gracias por reservar en nuestro hotel.
                La reserva se ha realizado con éxito.
                Los detalles de su reserva son los siguientes:
                - Fecha de ingreso: ${dateFormat(checkIn, DATE_FORMAT)}
                - Fecha de salida: ${dateFormat(checkOut, DATE_FORMAT)}
                - Habitación: ${categoria.nombre}
                - Precio: S/${categoria.precioCategoria.toFixed(2)}
                - Servicios: S/${categoria.costoServicios.toFixed(2)}
                - IGV(18%): S/${(categoria.costoTotalCategoria * 0.18).toFixed(
                  2
                )}
                - Total: S/${(
                  categoria.costoTotalCategoria +
                  categoria.costoTotalCategoria * 0.18
                ).toFixed(2)}          
                Su codigo de reserva es: ${codigoReserva}
                Esperamos que disfrute de su estancia.
                Atentamente, Hotel El Libertador`,
    };
    fetch("http://localhost:8080/api/enviarMensaje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            "api:0a7c4e7b2d7b5e5b4d3b7b7c9d9e5b4d-3a7c4e7b2d7b5e5b4d3b7b7c9d9e5b4d"
          ),
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          console.log("Falló en el fetch de envio de correo!");
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Envio de correo con exito!");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="contenedor-pago">
      <div className="panel-temporizador">
        <div className="panel-info">
          <div className="info">
            <h3>Fecha de estancia</h3>
            <p>{`${dateFormat(checkIn, DATE_FORMAT)} - ${dateFormat(
              checkOut,
              DATE_FORMAT
            )}`}</p>
          </div>
          <div className="info">
            <h3>Total por estancia</h3>
            <p>{`S/${(
              categoria.costoTotalCategoria +
              categoria.costoTotalCategoria * 0.18
            ).toFixed(2)}`}</p>
          </div>
        </div>
        <div className="temporizador">
          <p>
            <FaClock />
            Tiempo de reserva: {formatoTiempo(tiempo)}
          </p>
        </div>
      </div>
      <div className="panel-user">
        <div className="panel-categoria">
          <h1>{categoria.nombre}</h1>
          <img
            src={`https://hotel-libetador.s3.us-east-2.amazonaws.com/${categoria.foto[0].nombre}`}
            alt={`Foto ${categoria.nombre}`}
          />
          <div className="detalle-reserva">
            <h2>DETALLE DE RESERVA</h2>
            <div className="fechas">
              <p>
                <span>Ingreso:</span>
                {`${dateFormat(checkIn, DATE_FORMAT)}`}
              </p>
              <p>
                <span>Salida:</span>
                {`${dateFormat(checkOut, DATE_FORMAT)}`}
              </p>
            </div>
            <div className="precio">
              <p>
                {categoria.nombre}
                <span>{categoria.precioCategoria.toFixed(2)}</span>
              </p>
              <p>
                Servicios<span>{categoria.costoServicios.toFixed(2)}</span>
              </p>
              <p>
                IGV(18%)
                <span>{(categoria.costoTotalCategoria * 0.18).toFixed(2)}</span>
              </p>
              <div className="total">
                <p>
                  <span>Total:</span> S/
                  {(
                    categoria.costoTotalCategoria +
                    categoria.costoTotalCategoria * 0.18
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-pago">
          <div className="contenedor-form">
            <h1>PROCESO DE PAGO</h1>
            <form className="formulario-pago">
              <div className="input-form mid">
                <label htmlFor="txtNombre">Nombre</label>
                <input
                  readOnly
                  id="txtNombre"
                  type="text"
                  value={user.nombre}
                />
              </div>
              <div className="input-form mid">
                <label htmlFor="txtApellido">Apellidos</label>
                <input
                  readOnly
                  id="txtApellido"
                  type="text"
                  value={user.apellido}
                />
              </div>
              <div className="input-form mid">
                <label htmlFor="txtCorreo">
                  Dirección de Correo Electrónico
                </label>
                <input readOnly id="txtCorreo" type="text" value={user.email} />
              </div>
              <div className="input-form mid">
                <label htmlFor="txtDni">DNI</label>
                <input readOnly id="txtDni" type="text" value={user.dni} />
              </div>
              <button
                type="button"
                onClick={openNiubizPopup}
                className="btn-pagar"
              >
                PAGAR CON NIUBIZ
              </button>
            </form>
          </div>
        </div>
      </div>
      {isNiubizPop ? (
        <>
          <div className="black-wall" onClick={closeNiubizPopup}></div>
          <NiubizPayout
            closeNiubizPopup={closeNiubizPopup}
            pagoTotal={pagoTotal}
            handlePago={handlePago}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
