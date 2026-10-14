import Foto from "../components/Foto";
import { Link } from "react-router-dom";

export default function Nosotros() {
  return (
    <>
      <div className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb"><Link to="/">Inicio</Link><span className="mx-2">/</span><span className="breadcrumb-item active">Quiénes somos</span></nav>
        </div>
      </div>
      <section className="sec sec--white">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 rv">
              <h2 className="section-title titular">¿Quiénes somos?</h2>
              <p className="quienes__text">Somos Sasami, una tienda de Arequipa que vende ropa importada nueva y ropa de segunda mano en muy buen estado. Elegimos cada prenda para que tengas estilo sin gastar de más.</p>
              <p className="quienes__text">Creemos que cada prenda tiene una historia y que darle una segunda vida también es moda.</p>
            </div>
            <div className="col-lg-5 rv" style={{ "--d": 2 }}>
              <div className="quienes__art"><Foto src="/img/quienes.jpg" alt="El equipo de Sasami" loading="lazy" /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
