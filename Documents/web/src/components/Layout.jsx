import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { CATEGORIAS, TIENDA, enlaceWhatsApp, mensajeGeneral } from "../config";
import ErrorBoundary from "./ErrorBoundary";

const IG = "M12 2.2c3.2 0 3.6 0 4.8.07 3.3.15 4.8 1.7 4.96 4.96.06 1.26.07 1.64.07 4.77s0 3.51-.07 4.77c-.15 3.25-1.7 4.8-4.96 4.96-1.26.06-1.64.07-4.8.07s-3.51 0-4.77-.07c-3.26-.15-4.8-1.71-4.96-4.96C2.2 15.5 2.2 15.1 2.2 12s0-3.5.07-4.77C2.43 3.95 4 2.43 7.23 2.27 8.5 2.2 8.85 2.2 12 2.2ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z";
const WA = "M16 3C9 3 3 9 3 16c0 2.5.7 4.8 1.9 6.8L3 29l6.4-1.7A13 13 0 0 0 16 29c7 0 13-6 13-13S23 3 16 3Zm0 23.6c-2.2 0-4.3-.6-6-1.7l-.4-.2-3.8 1 1-3.7-.3-.4A10.6 10.6 0 1 1 26.6 16 10.6 10.6 0 0 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.3 2.4 3.7 5.8 5.1.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.2-.3-.3-.6-.4Z";

// Pantalla de entrada: se muestra una vez por visita
function Intro() {
  const [fase, setFase] = useState(() => {
    let saltar = false;
    try {
      saltar = !!sessionStorage.getItem("sasami-intro")
        || matchMedia("(prefers-reduced-motion: reduce)").matches
        || matchMedia("(max-width: 767px)").matches;
    } catch { /* ignorar */ }
    // Si no hay pantalla de entrada, el hero anima de inmediato
    document.documentElement.classList.toggle("intro-listo", saltar);
    return saltar ? "fin" : "entra";
  });
  useEffect(() => {
    if (fase === "fin") return;
    try { sessionStorage.setItem("sasami-intro", "1"); } catch { /* ignorar */ }
    const t1 = setTimeout(() => setFase("sale"), 1700);
    const t2 = setTimeout(() => setFase("fin"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (fase === "fin") return null;
  return (
    <div className={"intro" + (fase === "sale" ? " intro--sale" : "")} aria-hidden="true">
      <img src="/img/hero.png" alt="" />
    </div>
  );
}

// Hace aparecer (.rv → .rv.in) todo lo que entra en pantalla, incluso lo que se agrega después
function useRevelar(clave) {
  useEffect(() => {
    const todos = () => document.querySelectorAll(".rv:not(.rv-visto)");
    if (!("IntersectionObserver" in window)) { todos().forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    const vigilar = () => todos().forEach((e) => { e.classList.add("rv-visto"); io.observe(e); });
    vigilar();
    const mo = new MutationObserver(vigilar);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [clave]);
}

// Icono de carrito en rosado (se ve en la barra de navegación)
function IconoCarrito() {
  return (
    <svg className="cart-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
      <path d="M2 3h3l2.6 11.2a1.5 1.5 0 0 0 1.5 1.2h8.9a1.5 1.5 0 0 0 1.5-1.1L21 7H6.2" />
    </svg>
  );
}

export default function Layout({ cantidadCarrito }) {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "auto" }), [pathname]);
  useRevelar(pathname);
  const linkWa = enlaceWhatsApp(mensajeGeneral());
  const redes = [
    ["Instagram", TIENDA.instagram],
    ["TikTok", TIENDA.tiktok],
    ["Facebook", TIENDA.facebook],
  ].filter((r) => r[1]);

  return (
    <>
      <Intro />
      <div className="progreso" aria-hidden="true" />
      <nav className="navbar navbar-dark bg-dark py-3 sticky-top">
        <div className="container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
          <Link className="navbar-brand mb-0" to="/">SASAMI</Link>

          <div className="d-flex gap-3 flex-wrap cat-nav">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "is-active" : "")}>Inicio</NavLink>
            {Object.entries(CATEGORIAS).map(([k, c]) => (
              <NavLink key={k} to={`/categoria/${k}`} className={({ isActive }) => (isActive ? "is-active" : "")}>{c.nombre}</NavLink>
            ))}
            <NavLink to="/carrito" className={({ isActive }) => "cart-link" + (isActive ? " is-active" : "")}>
              <IconoCarrito />
              Carrito<span className="cart-badge">{cantidadCarrito}</span>
            </NavLink>
          </div>

          <div className="d-flex align-items-center gap-2">
            <a className="social-icon" href={TIENDA.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={IG} /></svg>
            </a>
          </div>
        </div>
      </nav>

      <main key={pathname} className="pagina"><ErrorBoundary key={pathname}><Outlet /></ErrorBoundary></main>

      <footer className="footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <p className="footer__brand">SASAMI</p>
              <p className="footer__tag">Ropa importada y de segunda mano, seleccionada en Arequipa.</p>
              <div className="d-flex gap-3 mt-2 footer__social">
                {redes.map(([n, u]) => (
                  <a key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>
                ))}
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <p className="footer__head">Enlaces</p>
              <Link to="/">Inicio</Link>
              {Object.entries(CATEGORIAS).map(([k, c]) => (
                <Link key={k} to={`/categoria/${k}`}>{c.nombre}</Link>
              ))}
              <Link to="/looks">Ideas para combinar</Link>
              <Link to="/nosotros">Quiénes somos</Link>
              <Link to="/ayuda">Preguntas frecuentes</Link>
            </div>
            <div className="col-6 col-lg-5">
              <p className="footer__head">Contacto</p>
              <p className="mb-1">WhatsApp: +{TIENDA.whatsapp}</p>
              <p className="mb-1">Arequipa, Perú</p>
              <p className="mb-1">Horario: {TIENDA.horario}</p>
              <p className="mb-0">Pagos: {TIENDA.pagos}</p>
            </div>
          </div>
        </div>
      </footer>

      <a className="fab-whatsapp" href={linkWa} target="_blank" rel="noopener noreferrer" aria-label="Pedir por WhatsApp">
        <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><path fill="currentColor" d={WA} /></svg>
      </a>
    </>
  );
}
