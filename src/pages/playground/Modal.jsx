import { createPortal } from "react-dom";
import Icon from "../../components/Icon";

// Modal genérico reutilizable para las 3 variantes del Playground:
// "default" (formulario), "danger" (rechazo, en rojo) y "success" (festejo).
//
// Se renderiza con un portal directo a document.body a propósito: si el
// overlay quedara anidado dentro de ".page" (que usa una animación con
// transform), ese ancestro pasa a ser el "containing block" del position:
// fixed y el modal termina apareciendo dentro de esa caja larga en vez de
// centrado en la pantalla actual — el portal lo saca de ese problema.
export default function Modal({ children, onClose, tone = "default", dismissible = true }) {
  return createPortal(
    <div className="pg-modal-overlay" onClick={dismissible ? onClose : undefined}>
      <div
        className={`pg-modal pg-modal--${tone}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {dismissible && (
          <button type="button" className="pg-modal-close" onClick={onClose} aria-label="Cerrar">
            <Icon name="close" size={15} />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
