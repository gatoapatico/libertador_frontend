export default function AdminCategorias() {
    return (
        <div className="admin-usuarios">
            <h1>CATEGORIAS</h1>
            <div className="panels">
                <div className="usuarios-tabla">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Costo servicios</th>
                                <th>Servicios</th>
                                <th>Cantidad personas</th>
                                <th>Fecha de Creacion</th>
                                <th>Fecha de Baja</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>SUIT</td>
                                <td>45</td>
                                <td>Cena</td>
                                <td>4</td>
                                <td>2023-11-10</td>
                                <td></td>
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