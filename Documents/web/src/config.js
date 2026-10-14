// ===== Configuración de la tienda — edita solo esto =====
export const TIENDA = {
  nombre: "Sasami",
  whatsapp: "51926637720",
  instagram: "https://instagram.com/TU_USUARIO", // ← pon tu Instagram real
  tiktok: "",
  facebook: "",
  horario: "Lun a Sáb, 10:00 a 20:00",
  pagos: "Yape, Plin y transferencia",
  entregas: "Entrega en mano en Arequipa y envíos a provincias.",
};

export const CATEGORIAS = {
  elegante: { nombre: "Semielegante", lede: "Para la oficina, una cena o una reunión importante", oscura: false },
  urbana: { nombre: "Urbana", lede: "Estilo callejero, actitud única", oscura: true },
  deportiva: { nombre: "Deportiva", lede: "Para entrenar o moverte con libertad", oscura: false },
  accesorios: { nombre: "Accesorios", lede: "El detalle que termina de armar el look", oscura: false },
};

// Fotos en public/img/looks/ (4:5). Al tocar una se pide por WhatsApp.
export const LOOKS = [
  { nombre: "Oficina con actitud", foto: "look-1.jpg" },
  { nombre: "Calle y comodidad", foto: "look-2.jpg" },
  { nombre: "Día de sol", foto: "look-3.jpg" },
];

export const NOVEDADES = 4;

export const PREGUNTAS = [
  ["¿Cómo hago mi pedido?", 'Elige la prenda, agrégala al carrito (o toca "Pedir por WhatsApp") y te respondemos para confirmar disponibilidad, pago y entrega.'],
  ["¿Las prendas de segunda mano están en buen estado?", "Revisamos cada prenda antes de venderla. En la ficha indicamos la condición y cualquier detalle."],
  ["¿Cómo y dónde entregan?", TIENDA.entregas],
  ["¿Qué medios de pago aceptan?", "Yape, Plin y transferencia bancaria."],
  ["¿Puedo cambiar una prenda si no me queda?", "Escríbenos dentro de las 48 horas siguientes a la entrega y lo revisamos contigo."],
];

// ===== Utilidades =====
export const formatoPrecio = (n) => "S/ " + n.toFixed(2);

export const enlaceWhatsApp = (mensaje) =>
  "https://wa.me/" + TIENDA.whatsapp + "?text=" + encodeURIComponent(mensaje);

export const mensajeGeneral = () =>
  `Hola ${TIENDA.nombre}, quisiera hacer una consulta sobre sus productos.`;

export const mensajeProducto = (p, color, talla) =>
  `Hola ${TIENDA.nombre}, quiero pedir: "${p.nombre}" — color ${color}, talla ${talla} (${formatoPrecio(p.precio)}). ¿Está disponible?`;

export const mensajeLook = (l) =>
  `Hola ${TIENDA.nombre}, me interesa el conjunto "${l.nombre}". ¿Está disponible?`;

export function mensajePedido(items, total) {
  const lineas = items.map(
    (i, n) => `${n + 1}. ${i.nombre} — color ${i.color}, talla ${i.talla} (${formatoPrecio(i.precio)})`
  );
  return `Hola ${TIENDA.nombre}, quiero pedir estas prendas:\n${lineas.join("\n")}\nTotal: ${formatoPrecio(total)}\n¿Están disponibles?`;
}

// Quita tildes y pasa a minúsculas para que "vestído" encuentre "vestido"
export const normalizar = (t) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
