export default function Rooms() {
    return (
        <section className="rooms">
            <h1>Nuestras Habitaciones</h1>
            <div className="room-cards">
                <div className="room">
                    <img src="/images/rooms/deluxe-king-1.png" alt="Deluxe King 1" />
                    <h2>Deluxe, Habitación, 1 King</h2>
                </div>
                <div className="room">
                    <img src="/images/rooms/deluxe-queen-2.png" alt="Deluxe Queen 2" />
                    <h2>Deluxe, Habitación, 2 Queen</h2>
                </div>
                <div className="room">
                    <img src="/images/rooms/standard-doble.jpg" alt="Standard Doble" />
                    <h2>Standard, Habitación, Doble</h2>
                </div>
                <div className="room">
                    <img src="/images/rooms/standard-matrimonial.jpg" alt="Standard Matrimonial" />
                    <h2>Standard, Habitación, Matrimonial</h2>
                </div>
            </div>
        </section>
    )
}