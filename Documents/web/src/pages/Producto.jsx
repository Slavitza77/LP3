import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Foto, { fotoProducto } from "../components/Foto";
import TarjetaProducto, { claseTag } from "../components/TarjetaProducto";
import NoEncontrado from "./NoEncontrado";
import { CATEGORIAS, enlaceWhatsApp, formatoPrecio, mensajeProducto } from "../config";

export default function Producto({ productos, carrito, onAgregar }) {
  const { id } = useParams();
  const p = productos.find((x) => x.id === Number(id));
  if (!p) return <NoEncontrado />;
  // key={p.id} reinicia el estado al navegar entre productos relacionados
  return <Detalle key={p.id} p={p} productos={productos} enCarrito={carrito.some((i) => i.id === p.id)} onAgregar={onAgregar} />;
}

function Detalle({ p, productos, enCarrito, onAgregar }) {
  const colores = p.colores?.length ? p.colores : [{ nombre: "único", hex: "#ccc" }];
  const tallas = p.tallas?.length ? p.tallas : ["Única"];
  const fotos = p.fotos || [];
  const [color, setColor] = useState(colores[0].nombre);
  const [talla, setTalla] = useState(tallas[0]);
  const [foto, setFoto] = useState(fotos[0]);
  const cat = CATEGORIAS[p.cat] || { nombre: "Sasami" };
  const relacionados = productos.filter((x) => x.cat === p.cat && x.id !== p.id && !x.sinFoto).slice(0, 4);

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link><span className="mx-2">/</span>
            <Link to={`/categoria/${p.cat}`}>{cat.nombre}</Link><span className="mx-2">/</span>
            <span className="breadcrumb-item active">{p.nombre}</span>
          </nav>
        </div>
      </div>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="detail-thumb ratio ratio-4x5">
              <span className={`card-tag ${claseTag(p.tagTipo)}`}>{p.tagTipo}</span>
              <Foto key={foto} src={fotoProducto(foto)} alt={p.nombre} />
              {p.vendido && <div className="vendido-mask">VENDIDO</div>}
            </div>
            {fotos.length > 1 && (
              <div className="thumbs">
                {fotos.map((f, i) => (
                  <button key={f} type="button" className={f === foto ? "is-active" : ""} onClick={() => setFoto(f)} aria-label={`Foto ${i + 1}`}>
                    <Foto src={fotoProducto(f)} alt={p.nombre} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="col-md-6">
            <p className="small text-muted mb-1">{cat.nombre}</p>
            <h1 className="h2 mb-2">{p.nombre}</h1>
            <p className="fw-bold fs-3 mb-3">{formatoPrecio(p.precio)}</p>
            <p className="mb-3">{p.desc}</p>
            <ul className="detail-detalles">
              <li><b>Marca:</b> {p.marca}</li>
              <li><b>Material:</b> {p.material}</li>
              <li><b>Condición:</b> {p.condicion}</li>
              <li><b>Medidas:</b> {p.medidas}</li>
            </ul>

            <p className="fw-semibold mb-2 small">Color: {color}</p>
            <div className="d-flex gap-2 mb-3">
              {colores.map((c) => (
                <button key={c.nombre} type="button" className={"swatch" + (c.nombre === color ? " is-active" : "")}
                        style={{ background: c.hex }} title={c.nombre} aria-label={`Color ${c.nombre}`} onClick={() => setColor(c.nombre)} />
              ))}
            </div>

            <p className="fw-semibold mb-2 small">Talla</p>
            <div className="d-flex gap-2 mb-4 flex-wrap">
              {tallas.map((t) => (
                <button key={t} type="button" className={"size-btn" + (t === talla ? " is-active" : "")} onClick={() => setTalla(t)}>{t}</button>
              ))}
            </div>

            {p.vendido ? (
              <>
                <button type="button" className="btn btn-whatsapp btn-lg" disabled>Vendido</button>
                <p className="small text-muted mt-2">Escríbenos y te avisamos si llega algo parecido.</p>
              </>
            ) : (
              <div className="add-row">
                <button type="button" className="btn btn-pink btn-lg" disabled={enCarrito} onClick={() => onAgregar(p, color, talla)}>
                  {enCarrito ? "En tu carrito ✓" : "Agregar al carrito"}
                </button>
                <a className="btn btn-whatsapp btn-lg" href={enlaceWhatsApp(mensajeProducto(p, color, talla))} target="_blank" rel="noopener noreferrer">
                  Pedir por WhatsApp
                </a>
              </div>
            )}
            {enCarrito && <p className="mt-3 mb-0"><Link to="/carrito" className="enlace">Ver mi carrito</Link></p>}
          </div>
        </div>

        {relacionados.length > 0 && (
          <div className="mt-5">
            <h2 className="h4 mb-3">También te puede interesar</h2>
            <div className="row row-cols-2 row-cols-md-4 g-3">
              {relacionados.map((r, i) => <TarjetaProducto key={r.id} p={r} i={i} />)}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
