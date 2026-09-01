import { useState } from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import logo from "../assets/logo.png";

const LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/experiencia", label: "Experiencia" },
  { to: "/habilidades", label: "Habilidades" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/playground", label: "Playground" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar({ visitorName, onExit }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <img src={logo} alt="" className="navbar-logo" />
          <span>bochita08</span>
        </NavLink>

        <nav className={`navbar-links ${open ? "navbar-links--open" : ""}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `navbar-link ${isActive ? "navbar-link--active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="navbar-visitor navbar-visitor--mobile">
            <span>Hola, {visitorName} 👋</span>
            <button className="navbar-exit" onClick={onExit}>
              Salir
            </button>
          </div>
        </nav>

        <div className="navbar-visitor navbar-visitor--desktop">
          <span>Hola, {visitorName} 👋</span>
          <button className="navbar-exit" onClick={onExit} title="Cambiar de visitante">
            Salir
          </button>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <Icon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>
    </header>
  );
}
