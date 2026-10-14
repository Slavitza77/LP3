import { Component } from "react";

// Si una página falla, muestra un aviso en vez de dejar la pantalla en blanco
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("Error en la página:", error, info);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="container py-5 text-center">
        <h1 className="h3 mb-3">Algo no salió bien</h1>
        <p className="mb-4">Recarga la página. Si sigue igual, escríbenos por WhatsApp.</p>
        <button type="button" className="btn btn-dark rounded-pill" onClick={() => window.location.reload()}>
          Recargar
        </button>
      </div>
    );
  }
}
