import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Inicio from "./pages/Inicio";
import Categoria from "./pages/Categoria";
import Producto from "./pages/Producto";
import Carrito from "./pages/Carrito";
import NoEncontrado from "./pages/NoEncontrado";
import Ayuda from "./pages/Ayuda";
import Nosotros from "./pages/Nosotros";
import Looks from "./pages/Looks";

const CLAVE = "sasami-carrito";

function leerCarrito() {
  try { return JSON.parse(localStorage.getItem(CLAVE)) || []; } catch { return []; }
}

export default function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState(leerCarrito);
  const [intento, setIntento] = useState(0);

  // Catálogo: public/productos.json (edítalo para agregar o marcar prendas vendidas)
  useEffect(() => {
    setCargando(true);
    setError(null);
    fetch("/productos.json")
      .then((r) => { if (!r.ok) throw new Error("No se pudo cargar el catálogo"); return r.json(); })
      .then((data) => setProductos(Array.isArray(data) ? data.filter((p) => p && p.id != null) : []))
      .catch(() => setError("No pudimos cargar las prendas. Revisa tu conexión."))
      .finally(() => setCargando(false));
  }, [intento]);

  // El carrito sobrevive a recargar la página
  useEffect(() => {
    try { localStorage.setItem(CLAVE, JSON.stringify(carrito)); } catch { /* ignorar */ }
  }, [carrito]);

  // Cada prenda es única: si ya está en el carrito, no se repite
  const agregar = (p, color, talla) =>
    setCarrito((a) => a.some((i) => i.id === p.id) ? a
      : [...a, { id: p.id, nombre: p.nombre, precio: p.precio, foto: p.fotos?.[0], color, talla }]);
  const quitar = (id) => setCarrito((a) => a.filter((i) => i.id !== id));
  const vaciar = () => setCarrito([]);

  // Si una prenda del carrito se marcó como vendida, no se pide
  const vigente = carrito.filter((i) => productos.find((p) => p.id === i.id && !p.vendido));
  const carritoVisible = productos.length ? vigente : carrito;

  if (cargando) return <p className="container py-5">Cargando prendas de Sasami…</p>;
  if (error) return (
    <div className="container py-5">
      <p>{error}</p>
      <button type="button" className="btn btn-dark rounded-pill" onClick={() => setIntento((n) => n + 1)}>Reintentar</button>
    </div>
  );

  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout cantidadCarrito={carritoVisible.length} />}>
          <Route index element={<Inicio productos={productos} />} />
          <Route path="categoria/:cat" element={<Categoria productos={productos} />} />
          <Route path="producto/:id" element={<Producto productos={productos} carrito={carritoVisible} onAgregar={agregar} />} />
          <Route path="carrito" element={<Carrito carrito={carritoVisible} onQuitar={quitar} onVaciar={vaciar} />} />
          <Route path="ayuda" element={<Ayuda />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="looks" element={<Looks />} />
          <Route path="*" element={<NoEncontrado />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
