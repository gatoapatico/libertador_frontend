export default function Login({handleExit, handleLogin, openRegistro}) {
    return (
        <div className="popup-login">
            <div className="login-details">
                
            </div>
            <div className="login-user">
                <span className="btn-exit" onClick={handleExit}>X</span>
                <h2>Iniciar sesión</h2>
                <form className="login-form" >
                    <input type="text" name="txtNombre" placeholder="Email"/>
                    <input type="password" name="txtContra" placeholder="Password"/>
                    <button type="submit" onClick={(e) => handleLogin(e)}>Iniciar Sesión</button>
                </form>
                <p className="no-account">¿No tienes cuenta?<span className="btn-registrate" onClick={openRegistro}>Regístrate</span></p>
            </div>
        </div>
    )
}