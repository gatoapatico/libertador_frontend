export default function Registro({handleExit, handleRegister, openLogin}) {
    return (
        <div className="popup-registro">
            <div className="registro-details">
                
            </div>
            <div className="registro-user">
                <span className="btn-exit" onClick={handleExit}>X</span>
                <h2>Registro</h2>
                <form className="registro-form" >
                    <input type="text" name="txtNombre" placeholder="Email"/>
                    <input type="password" name="txtContra" placeholder="Password"/>
                    <input type="text" name="txtDNI" placeholder="Documento de Identidad"/>
                    <input type="text" name="txtNombre" placeholder="Nombre"/>
                    <input type="text" name="txtApellido" placeholder="Apellidos"/>
                    <input type="text" name="txtTelefono" placeholder="Teléfono"/>
                    <button type="submit" onClick={(e) => handleRegister(e)}>Regístrate</button>
                </form>
                <p className="no-account">¿Ya eres parte de nosotros?<span className="btn-login" onClick={openLogin}>Inicia Sesión</span></p>
            </div>
        </div>
    )
}