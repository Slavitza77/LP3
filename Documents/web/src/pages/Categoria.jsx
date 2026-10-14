import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TarjetaProducto from "../components/TarjetaProducto";
import NoEncontrado from "./NoEncontrado";
import { CATEGORIAS, normalizar } from "../config";

const FILTROS = [["todo", "Todo"], ["Nuevo importado", "Nuevo importado"], ["Segunda mano", "Segunda mano"]];

export default function Categoria({ productos }) {
  const { cat } = useParams();
  const [filtro, setFiltro] = useState("todo");
  const [busqueda, setBusqueda] = useState("");
  const info = CATEGORIAS[cat];
  if (!info) return <NoEncontrado />;

  const lista = productos.filter(
    (p) =>
      p.cat === cat &&
      !p.sinFoto &&
      (filtro === "todo" || p.tagTipo === filtro) &&
      normalizar(p.nombre).includes(normalizar(busqueda))
  );

  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link><span className="mx-2">/</span>
            <span className="breadcrumb-item active">{info.nombre}</span>
          </nav>
        </div>
      </div>
      <section className={"cat-band " + (info.oscura ? "cat-band--dark" : "")}>
        <div className="container py-4">
          <h1 className="cat-band__title">{info.nombre}</h1>
          <p className="cat-band__lede">{info.lede}</p>
        </div>
      </section>
      <section className="container py-4 pb-5">
        <input className="buscador mb-3" type="search" placeholder="Buscar prenda…" aria-label="Buscar prenda"
               value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <div className="filtros">
          {FILTROS.map(([v, t]) => (
            <button key={v} type="button" className={"filtro" + (filtro === v ? " is-active" : "")} onClick={() => setFiltro(v)}>{t}</button>
          ))}
        </div>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4">
          {lista.length ? lista.map((p, i) => <TarjetaProducto key={p.id} p={p} i={i} />) : (
            <p className="col-12 text-muted">No hay prendas con este filtro por ahora. Escríbenos por WhatsApp y te avisamos cuando llegue algo.</p>
          )}
        </div>
      </section>
    </>
  );
}
