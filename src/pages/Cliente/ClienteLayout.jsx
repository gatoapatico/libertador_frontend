import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import Login from "../../components/popups/Login";
import Registro from "../../components/popups/Registro";

export default function ClienteLayout() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [isPopup, setIsPopup] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegistro, setIsRegistro] = useState(false);

    function openLogin() {
        setIsRegistro(false);
        setIsPopup(true);
        setIsLogin(true);
    }

    function openRegistro() {
        setIsPopup(true);
        setIsLogin(false);
        setIsRegistro(true);
    }

    function handleExit() {
        setIsLogin(false);
        setIsPopup(false);
        setIsRegistro(false);
    }

    function handleLogOut() {
        window.localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    }

    useEffect(() => {
        if(window.localStorage.getItem("user")) {
            setUser(JSON.parse(window.localStorage.getItem("user")));
        }
    }, []);

    return (
        <div className='contenedor-cliente'>
            <Header openLogin={openLogin} user={user} handleLogOut={handleLogOut}/>
            <Outlet
                context={[startDate, setStartDate, endDate, setEndDate, user, openLogin]}
            />
            <Footer />
            <div className={`blur-layout ${isPopup?"" : "hidden"}`} onClick={handleExit}>
            </div>
            { isLogin ? <Login handleExit={handleExit} openRegistro={openRegistro}/> : "" }
            { isRegistro ? <Registro handleExit={handleExit} openLogin={openLogin}/> : "" }
        </div>
    )
}