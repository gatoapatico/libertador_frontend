import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Outlet } from "react-router-dom"
import { useState } from "react";
import Login from "../../components/popups/Login";
import Registro from "../../components/popups/Registro";

export default function ClienteLayout() {

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

    return (
        <div className='contenedor-cliente'>
            <Header openLogin={openLogin}/>
            <Outlet
                context={[startDate, setStartDate, endDate, setEndDate]}
            />
            <Footer />
            <div className={`blur-layout ${isPopup?"" : "hidden"}`} onClick={handleExit}>
            </div>
            { isLogin ? <Login handleExit={handleExit} openRegistro={openRegistro}/> : "" }
            { isRegistro ? <Registro handleExit={handleExit} openLogin={openLogin}/> : "" }
        </div>
    )
}