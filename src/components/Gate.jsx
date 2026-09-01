import { useState } from "react";
import Icon from "./Icon";
import logo from "../assets/logo.png";

export default function Gate({ onEnter }) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      return;
    }
    onEnter(trimmed);
  };

  return (
    <div className="gate">
      <div className="gate-bg" aria-hidden="true">
        <span className="gate-glow gate-glow--a" />
        <span className="gate-glow gate-glow--b" />
      </div>

      <div className={`gate-card ${shake ? "gate-card--shake" : ""}`}>
        <img src={logo} alt="Logo bochita08" className="gate-logo" />
        <p className="gate-eyebrow">Portfolio de Nahuel Fortuna</p>
        <h1 className="gate-title">Antes de entrar…</h1>
        <p className="gate-subtitle">¿Cómo te llamás? Así te recibo como corresponde.</p>

        <form className="gate-form" onSubmit={submit}>
          <label className="gate-label" htmlFor="visitor-name">
            Tu nombre
          </label>
          <input
            id="visitor-name"
            className="gate-input"
            type="text"
            placeholder="Ej: María"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            maxLength={40}
          />
          <button className="gate-button" type="submit">
            Entrar
            <Icon name="arrow" size={18} />
          </button>
        </form>

        <p className="gate-hint">No guardamos nada en ningún servidor: queda solo en tu navegador.</p>
      </div>
    </div>
  );
}
