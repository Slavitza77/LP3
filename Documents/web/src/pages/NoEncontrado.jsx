import { Link } from "react-router-dom";

export default function NoEncontrado() {
  return (
    <div className="container py-5 text-center">
      <h1 className="h3">No encontramos esa página</h1>
      <p><Link to="/">Volver al inicio</Link></p>
    </div>
  );
}
