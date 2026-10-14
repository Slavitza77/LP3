import { useEffect, useState } from "react";

// Muestra la foto; si el archivo no existe (o cambia de src), muestra un recuadro "SASAMI"
export default function Foto({ src, alt, ...resto }) {
  const [rota, setRota] = useState(false);
  useEffect(() => setRota(false), [src]);
  if (rota || !src) return <div className="ph">SASAMI</div>;
  return <img src={src} alt={alt} decoding="async" onError={() => setRota(true)} {...resto} />;
}

export const fotoProducto = (archivo) => (archivo ? `/img/productos/${archivo}` : null);
