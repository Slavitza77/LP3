import { Link } from "react-router-dom";
import Foto, { fotoProducto } from "../components/Foto";
import { TIENDA, enlaceWhatsApp, formatoPrecio, mensajePedido } from "../config";

export default function Carrito({ carrito, onQuitar, onVaciar }) {
  const total = carrito.reduce((s, i) => s + i.precio, 0);

  return (
    <div className="container py-5">
      <h1 className="h2 mb-4">Tu carrito</h1>
      {carrito.length === 0 ? (
        <>
          <p>Tu carrito está vacío.</p>
          <Link to="/" className="btn btn-dark rounded-pill">Seguir mirando</Link>
        </>
      ) : (
        <div className="carrito">
          <ul className="carrito-lista">
            {carrito.map((i) => (
              <li className="carrito-item" key={i.id}>
                <div className="mini"><Foto src={fotoProducto(i.foto)} alt={i.nombre} /></div>
                <div>
                  <p className="carrito-item__nombre">{i.nombre}</p>
                  <p className="carrito-item__meta">color {i.color} · talla {i.talla}</p>
                  <button type="button" className="enlace" onClick={() => onQuitar(i.id)}>Quitar</button>
                </div>
                <p className="carrito-item__precio">{formatoPrecio(i.precio)}</p>
              </li>
            ))}
          </ul>
          <div className="carrito-total"><span>Total</span><strong>{formatoPrecio(total)}</strong></div>
          <p className="carrito-nota">Pagos: {TIENDA.pagos}. Confirmamos disponibilidad por WhatsApp.</p>
          <div className="carrito-acciones">
            <a className="btn btn-whatsapp btn-lg rounded-pill" href={enlaceWhatsApp(mensajePedido(carrito, total))} target="_blank" rel="noopener noreferrer">
              Pedir por WhatsApp
            </a>
            <button type="button" className="btn btn-outline-ink btn-lg rounded-pill" onClick={onVaciar}>Vaciar carrito</button>
          </div>
        </div>
      )}
    </div>
  );
}
