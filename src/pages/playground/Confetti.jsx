import { createPortal } from "react-dom";

const COLORS = ["#4fd1c5", "#8b7cf6", "#6ee7b7", "#ffb86b", "#ff8787", "#eaf0fb"];

// Confetti casero, sin librerías: N partículas absolutas con caída/rotación
// animadas por CSS. `burstKey` cambia en cada festejo para remontar el set
// de partículas y disparar la animación de nuevo.
export default function Confetti({ burstKey }) {
  if (!burstKey) return null;

  const pieces = Array.from({ length: 46 }, (_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 0.35;
    const duration = 1.6 + Math.random() * 1.1;
    const size = 6 + Math.random() * 7;
    const color = COLORS[i % COLORS.length];
    const rotate = Math.random() * 360;
    const drift = (Math.random() - 0.5) * 120;
    return { i, left, delay, duration, size, color, rotate, drift };
  });

  return createPortal(
    <div className="pg-confetti" key={burstKey} aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.i}
          className="pg-confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--rotate": `${p.rotate}deg`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>,
    document.body
  );
}
