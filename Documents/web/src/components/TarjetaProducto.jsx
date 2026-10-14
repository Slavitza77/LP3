import { Link } from "react-router-dom";
import Foto, { fotoProducto } from "./Foto";
import { formatoPrecio } from "../config";

export const claseTag = (t) => (t === "Segunda mano" ? "card-tag--segunda" : "card-tag--nuevo");

// i = posición en la lista, para que las tarjetas aparezcan una tras otra
export default function TarjetaProducto({ p, i = 0 }) {
  return (
    <Link className="col text-decoration-none rv" style={{ "--d": i % 4 }} to={`/producto/${p.id}`}>
      <div className="product-card">
        <div className="ratio ratio-4x5 card-thumb">
          <span className={`card-tag ${claseTag(p.tagTipo)}`}>{p.tagTipo}</span>
          <Foto src={fotoProducto(p.fotos?.[0])} alt={p.nombre} loading="lazy" />
          {/* Al pasar el mouse se muestra la segunda foto */}
          {p.fotos?.[1] && <Foto src={fotoProducto(p.fotos[1])} alt="" loading="lazy" className="card-alt" />}
          {p.vendido && <div className="vendido-mask">VENDIDO</div>}
        </div>
        <div className="card-body">
          <p className="card-name">{p.nombre}</p>
          <p className="card-price">{formatoPrecio(p.precio)}</p>
        </div>
      </div>
    </Link>
  );
}
