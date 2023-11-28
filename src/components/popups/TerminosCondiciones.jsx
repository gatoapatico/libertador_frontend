import { IoCloseCircleSharp } from "react-icons/io5";

export default function TerminosCondiciones({ handleTermCond }) {
    return (
        <div className="popup-terminos">
            <div className="titulo">
                <h1>Términos y condiciones</h1>
                <span className="btn-exit" onClick={handleTermCond}><IoCloseCircleSharp /></span>
            </div>
            
            <ul>
                <li>El hotel no se responsabiliza por objetos de valor introducidos y dejados en su habitación sin conocimiento de la administración (Código civil).</li>
                <li>La reserva de la habitación no está ligada a un espacio en la cochera. Una vez realizado el pago por alojamiento, reservas y otros servicios del hotel no hay lugar a reclamo ni devolución.</li>
                <li>No se aceptan canjes fuera de tiempo de boleta por factura. Todo consumo deberá ser cancelado por adelantado, sea este por alojamiento o por servicios.</li>
                <li>Para efectos de crédito de hospedaje y otros servicios se deberá dejar garantía (efectivo y/o voucher firmado).</li>
                <li>El hotel no se responsabiliza, bajo ninguna circunstancia, por cualquier daño producido por terceros al vehículo o la pérdida total o parcial de sus accesorios, mientras este se encuentre dentro y/o fuera del estacionamiento.</li>
                <li>El servicio de estacionamiento no comprende el deber de vigilancia por parte del Hotel sino únicamente la sesión temporal del uso de un área para parqueo.</li>
                <li>Solo se considera como huésped a la persona registrada en el hotel. El huésped se compromete a entregar la habitación tal como se le fue entregada.</li>
                <li>Cualquier daño o deterioro producido por el huésped dentro de las instalaciones será asumido por el titular.</li>
                <li>Para efectuar un check-out rápido avisar 10 minutos antes para la elaboración de su cuenta.</li>
                <li>Al retiro del huésped registrado, toda visita que tuviera deberá dejar la habitación y/o identificarse.</li>
                <li>Toda visita deberá ser recibida en el lobby y/o cafetería.</li>
                <li>El número de personas dentro de una habitación está determinado por el tipo de habitación tomada.</li>
                <li>Las prendas dejadas en custodia no podrán exceder a tres meses.</li>
                <li>Todo objeto dejado en garantía será tomado como custodia y podrá ser vendido o rematado por el hotel en un plazo de 3 meses de la fecha de entrega (custodia).</li>
                <li>Las llamadas telefónicas deberán contar con garantía en efectivo y/o voucher firmado para realizar las llamadas.</li>
                <li>Toda custodia será entregada solo al propietario del bien.</li>
                <li>El usuario de custodia se obliga a cumplir el reglamento interno del hotel.</li>
                <li>En caso de que el pago se efectúe con tarjeta de crédito, las devoluciones serán vía banco, de ningún modo en efectivo.</li>
                <li>Está prohibido introducir en las habitaciones planchas, velas, microondas, artículos inflamables, etc.</li>
                <li>Autorizo a la empresa a retirar mi equipaje de la habitación en caso no hubiera cancelado mi hospedaje hasta antes del 12 PM, sin lugar a reclamo.</li>
                <li>Para asegurar el uso de mi habitación y de esta manera permanencia y estadía, deberé pagar el costo de la habitación un día antes.</li>
                <li>Todo pago realizado después del medio día (12 PM) será actualizado a tarifa rack (tarifa normal).</li>
                <li>El pago por medio día de estadía tendrá una salida máxima a las 19:00 horas y el pago será calculado en base al 50% de la tarifa rack (normal).</li>
                <li>Los pagos de alojamiento no podrán ser utilizados para cubrir consumos ni llamadas, y viceversa.</li>
                <li>La apertura de las cajas de seguridad (caja fuerte) de las habitaciones podrá ser aperturada a solicitud del huésped en hora de oficina, por ningún motivo se aceptará otro horario (Lunes a Viernes de 09:00 a 17:00).</li>
            </ul>
            <img className="logo" src="/images/libertador_logo.png" alt="Libertador Logo" />
        </div>
    )
}