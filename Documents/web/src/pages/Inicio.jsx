import { useRef } from "react";
import { Link } from "react-router-dom";
import Foto from "../components/Foto";
import TarjetaProducto from "../components/TarjetaProducto";
import { CATEGORIAS, NOVEDADES, TIENDA, enlaceWhatsApp, mensajeGeneral } from "../config";

const PASOS = [
  ["1", "Elige tu prenda", "Mira las fotos, la talla y las medidas."],
  ["2", "Escríbenos por WhatsApp", "Confirmamos que sigue disponible."],
  ["3", "Paga y recibe", "Yape, Plin o transferencia. Entrega en Arequipa o envío a provincias."],
];

const FRANJA = ["Nuevo importado", "Segunda mano casi nueva", "Envíos a provincias", "Yape · Plin", "Piezas únicas"];

// Franja que corre sin parar (el contenido se repite para que el bucle no se note)
function Franja({ invertida, contorno }) {
  const items = [...FRANJA, ...FRANJA];
  return (
    <div className={"franja" + (invertida ? " franja--inv" : "") + (contorno ? " franja--contorno" : "")} aria-hidden="true">
      <div className="franja__pista">
        {[0, 1].map((n) => (
          <div className="franja__grupo" key={n}>
            {items.map((t, i) => <span key={i}>{t} <b>✦</b></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

// Palabras que suben una a una
const Palabras = ({ texto, desde = 0, clase = "" }) =>
  texto.split(" ").map((w, i) => (
    <span className="pal" key={i}><span className={clase} style={{ "--i": desde + i }}>{w}&nbsp;</span></span>
  ));

function Hero() {
  const ref = useRef(null);

  // El mouse (o el dedo) mueve las fotos con distinta profundidad
  const mover = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", x.toFixed(3));
    el.style.setProperty("--py", y.toFixed(3));
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <header className="hero hero--oscuro" ref={ref} onPointerMove={mover}>
      <div className="hero__luz" aria-hidden="true" />
      <div className="container py-5 position-relative">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <h1 className="hero__titulo mt-0">
              <Palabras texto="Viste" desde={1} />
              <Palabras texto="distinto." desde={2} clase="rosa" /><br />
              <Palabras texto="Viste Sasami." desde={3} />
            </h1>
            <p className="hero__lede hero-in" style={{ "--i": 6 }}>
              Streetwear, looks elegantes y piezas únicas de segunda mano. Pide por WhatsApp en un toque.
            </p>
            <div className="d-flex gap-3 flex-wrap mt-3 hero-in" style={{ "--i": 7 }}>
              <a href="#novedades" className="btn btn-pink btn-lg rounded-pill btn-latido"
                 onClick={(e) => { e.preventDefault(); document.getElementById("novedades")?.scrollIntoView({ behavior: "smooth" }); }}>
                Ver novedades
              </a>
              <button type="button" className="btn btn-outline-light btn-lg rounded-pill" onClick={() => document.getElementById("explora")?.scrollIntoView({ behavior: "smooth" })}>
                Ver categorías
              </button>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="escena">
              <div className="escena__capa escena__capa--logo"><div className="escena__logo"><Foto src="/img/hero.png" alt="Sasami Boutique" /></div></div>
              <div className="escena__capa escena__capa--a"><div className="flota flota--a"><Foto src="/img/productos/polo-dragon.jpg" alt="" /></div></div>
              <div className="escena__capa escena__capa--b"><div className="flota flota--b"><Foto src="/img/productos/falda-cuero.jpg" alt="" /></div></div>
              <div className="escena__capa escena__capa--c"><div className="flota flota--c"><Foto src="/img/productos/vestido-MM.jpg" alt="" /></div></div>
              <div className="escena__capa escena__capa--sello"><div className="sello"><span>1 sola<br />pieza<br />¡única!</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Inicio({ productos }) {
  // Las prendas marcadas "sinFoto" en productos.json no salen aquí hasta que subas su foto
  const nuevos = productos.filter((p) => !p.sinFoto).slice(-NOVEDADES).reverse();

  return (
    <>
      <Hero />
      <Franja />

      <section className="sec" id="novedades">
        <div className="container">
          <h2 className="section-title titular rv">Recién llegados</h2>
          <p className="section-sub rv mb-3" style={{ "--d": 1 }}>Cada prenda de segunda mano es única: cuando se vende, no vuelve.</p>
          <div className="chips rv" style={{ "--d": 2 }}>
            <span className="chip"><i />Nuevo importado</span>
            <span className="chip"><i />Segunda mano casi nueva</span>
          </div>
          <div className="row row-cols-2 row-cols-md-4 g-3 g-lg-4">
            {nuevos.map((p, i) => <TarjetaProducto key={p.id} p={p} i={i} />)}
          </div>
        </div>
      </section>

      <section className="sec" id="explora">
        <div className="container">
          <h2 className="section-title titular text-center mb-4 rv">Explora por estilo</h2>
          <div className="row g-3 g-lg-4">
            {Object.entries(CATEGORIAS).map(([k, c], i) => (
              <div className="col-6 col-lg-3 rv" style={{ "--d": i }} key={k}>
                <Link to={`/categoria/${k}`} className="style-tile">
                  <Foto src={`/img/categorias/${k}.jpg`} alt={c.nombre} loading="lazy" />
                  <span>{c.nombre} <i className="flecha">→</i></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--white">
        <div className="container">
          <h2 className="section-title titular mb-4 rv">Cómo comprar</h2>
          <div className="row g-4">
            {PASOS.map(([n, t, d], i) => (
              <div className="col-md-4 rv" style={{ "--d": i }} key={n}>
                <div className="step-num">{n}</div>
                <p className="step-title">{t}</p>
                <p className="step-desc">{d}</p>
              </div>
            ))}
          </div>
          <p className="section-sub mt-4 mb-0 rv">{TIENDA.entregas} Pagos: {TIENDA.pagos}.</p>
        </div>
      </section>

    </>
  );
}
