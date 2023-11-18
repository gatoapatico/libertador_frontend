export default function AdminUsuarios() {

    function handleForm(e) {
        e.preventDefault();
    }

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
                            <input type="text" id="txtEmail" placeholder="Ingrese un email"/>
                            {/* <label htmlFor="txtEmail">Email</label> */}
                        </div>
                        <div className="input-form">
                            <input type="text" id="txtContrasena" placeholder="Ingrese una contraseña"/>
                        </div>
                        <div className="input-form">
                            <input type="text" id="txtDni" placeholder="Ingrese un número de dni"/>
                        </div>
                        <div className="input-form">
                            <input type="text" id="txtNombre" placeholder="Ingrese un nombre"/>
                        </div>
                        <div className="input-form">
                            <input type="text" id="txtApellido" placeholder="Ingrese un apellido"/>
                        </div>
                        <div className="input-form">
                            <input type="text" id="txtTelefono" placeholder="Ingrese un número de teléfono"/>
                        </div>
                        <div className="input-form">
                            <select id="txtTipo" required>
                                <option value="Cliente">Cliente</option>
                                <option value="Adminsitrador">Administrador</option>
                            </select>
                        </div>
                        <button className="btn-crear-actualizar" onClick={(e) => handleForm(e)}>Crear/Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}