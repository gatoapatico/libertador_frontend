import Header from "../components/Header"
import Landing from "../components/Landing"
import Services from "../components/Services"
import Rooms from "../components/Rooms"
import Footer from "../components/Footer"

export default function Home() {
    return (
        <div className='body-container'>
            <Header />
            <Landing />
            <Services />
            <Rooms />
            <Footer />
        </div>
    )
}