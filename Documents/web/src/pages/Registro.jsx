import { useState } from "react";
import { TIENDA, enlaceWhatsApp } from "../config";

const vacio = { nombre: "", correo: "", talla: "" };

// Formulario controlado (del Ejercicio 2 de la tarea), adaptado a la tienda:
// la clienta deja sus datos y confirma por WhatsApp para que le avisen de novedades.
export default function Registro() {
  const [form, setForm] = useState(vacio);
  const [enviado, setEnviado] = useState(null);

  const cambiar = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const enviar = (e) => {
    e.preventDefault();
    try {
      const guardados = JSON.parse(localStorage.getItem("sasami-registros") || "[]");
      localStorage.setItem("sasami-registros", JSON.stringify([...guardados, { ...form, fecha: Date.now() }]));
    } catch { /* sin almacenamiento: no pasa nada */ }
    setEnviado(form);
    setForm(vacio);
  };

  return (
    <div className="container py-5">
      <h1 className="h2 mb-2">Registro de clientas</h1>
      <p className="mb-4 text-muted">Déjanos tus datos y te avisamos cuando llegue ropa en tu talla.</p>

      {enviado ? (
        <div>
          <p className="fw-semibold">¡Gracias, {enviado.nombre}! Tus datos quedaron registrados.</p>
          <p>Para que {TIENDA.nombre} te escriba, confírmalo por WhatsApp:</p>
          <a className="btn btn-whatsapp rounded-pill" target="_blank" rel="noopener noreferrer"
             href={enlaceWhatsApp(`Hola ${TIENDA.nombre}, soy ${enviado.nombre} (${enviado.correo}). Avísenme de las novedades en talla ${enviado.talla}.`)}>
            Confirmar por WhatsApp
          </a>
          <button type="button" className="btn btn-outline-ink rounded-pill ms-2" onClick={() => setEnviado(null)}>Registrar a otra persona</button>
        </div>
      ) : (
        <form className="formulario" onSubmit={enviar}>
          <label>Nombre<input type="text" name="nombre" value={form.nombre} onChange={cambiar} required /></label>
          <label>Correo<input type="email" name="correo" value={form.correo} onChange={cambiar} required /></label>
          <label>Talla preferida
            <select name="talla" value={form.talla} onChange={cambiar} required>
              <option value="">Selecciona…</option>
              {["XS", "S", "M", "L", "XL"].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <button type="submit" className="btn btn-pink btn-lg rounded-pill">Registrarme</button>
        </form>
      )}
    </div>
  );
}
