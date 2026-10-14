import { useState } from "react";
import { Link } from "react-router-dom";
import { PREGUNTAS } from "../config";

export default function Ayuda() {
  const [abierta, setAbierta] = useState(null);
  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb"><Link to="/">Inicio</Link><span className="mx-2">/</span><span className="breadcrumb-item active">Ayuda</span></nav>
        </div>
      </div>
      <section className="sec">
        <div className="container rv" style={{ maxWidth: 820 }}>
          <h2 className="section-title titular mb-4">Preguntas frecuentes</h2>
          <div className="accordion">
            {PREGUNTAS.map(([q, a], i) => (
              <div className="accordion-item" key={q}>
                <h3 className="accordion-header">
                  <button type="button" className={"accordion-button" + (abierta === i ? "" : " collapsed")}
                          aria-expanded={abierta === i} onClick={() => setAbierta(abierta === i ? null : i)}>
                    {q}
                  </button>
                </h3>
                <div className={"accordion-collapse collapse" + (abierta === i ? " show" : "")}>
                  <div className="accordion-body">{a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
