import { Link } from "react-router-dom";
import Foto from "../components/Foto";
import { LOOKS, TIENDA, enlaceWhatsApp, mensajeLook } from "../config";

export default function Looks() {
  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb"><Link to="/">Inicio</Link><span className="mx-2">/</span><span className="breadcrumb-item active">Ideas para combinar</span></nav>
        </div>
      </div>
      <section className="sec">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-1">
            <h2 className="section-title titular mb-0 rv">Ideas para combinar</h2>
            <a className="btn btn-outline-ink rounded-pill rv" href={TIENDA.instagram} target="_blank" rel="noopener noreferrer">Más looks en Instagram</a>
          </div>
          <p className="section-sub rv">Conjuntos ya armados. Toca el que te guste y pídelo por WhatsApp.</p>
          <div className="row g-3 g-lg-4">
            {LOOKS.map((l, i) => (
              <div className="col-6 col-md-4 rv" style={{ "--d": i }} key={l.nombre}>
                <a className="look" href={enlaceWhatsApp(mensajeLook(l))} target="_blank" rel="noopener noreferrer"
                   aria-label={`Pedir el conjunto ${l.nombre} por WhatsApp`}>
                  <Foto src={`/img/looks/${l.foto}`} alt={l.nombre} loading="lazy" />
                  <span className="look__info">
                    <span className="look__nombre">{l.nombre}</span>
                    <span className="look__cta">Lo quiero</span>
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
