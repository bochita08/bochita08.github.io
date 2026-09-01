import { useState } from "react";
import Icon from "../../components/Icon";
import Modal from "./Modal";
import { LEVEL1_CASES, emailChecklist, passwordChecklist, sanitizeNameInput } from "./cases";

const initialValues = () =>
  Object.fromEntries(LEVEL1_CASES.map((c) => [c.id, c.field === "checkbox" ? false : ""]));

export default function Level1({ onAttempt, onLog, onLevelComplete, completed }) {
  // El modal NUNCA se abre solo: el jugador tiene que apretar "Abrir
  // formulario" a propósito, después de ver esta pantalla primero.
  const [modalOpen, setModalOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [rejection, setRejection] = useState(null);
  const [showHints, setShowHints] = useState(false);

  const setValue = (id, v) => setValues((prev) => ({ ...prev, [id]: v }));

  const emailChecks = emailChecklist(values.email);
  const passwordChecks = passwordChecklist(values.password);

  const handleSubmit = (e) => {
    e.preventDefault();

    const results = LEVEL1_CASES.map((c) => {
      const raw = values[c.id];
      const isEmptyText = c.field === "text" && (!raw || raw.trim() === "");
      if (c.optional && isEmptyText) return null;
      const actual = c.run(raw);
      const expectedVal = c.expected(raw);
      return { case: c, raw, actual, expectedVal, passed: actual === expectedVal };
    }).filter(Boolean);

    results.forEach((r) => {
      const shownValue = r.case.field === "checkbox" ? (r.raw ? "tildado" : "destildado") : r.raw;
      onAttempt({
        level: 1,
        levelLabel: "Nivel 1 · Formulario",
        caseId: r.case.id,
        caseName: r.case.label,
        inputUsed: shownValue,
        passed: r.passed,
        reason: r.passed ? null : r.case.bugText,
      });
      onLog(
        r.passed ? "pass" : "fail",
        `Nivel 1 · ${r.case.label} → ${r.passed ? "PASS" : "FAIL"} (valor: "${shownValue}")${
          r.passed ? "" : ` — ${r.case.bugText}`
        }`
      );
    });

    const failed = results.filter((r) => r.actual !== true);
    if (failed.length > 0) {
      setErrors(Object.fromEntries(failed.map((f) => [f.case.id, f.case.shortError])));
      setRejection(failed);
    } else {
      setErrors({});
      setRejection(null);
      setModalOpen(false);
      onLevelComplete();
    }
  };

  return (
    <div className="pg-level">
      <p className="pg-level-intro">
        Simulamos un registro real: completá el formulario y enviálo. Corre contra el mismo código —
        con bugs reales adentro — que usaría la app de verdad. Si algo no matchea te lo marcamos en
        rojo y podés reintentar las veces que quieras.
      </p>

      {completed && (
        <div className="pg-case-result pg-case-result--pass">
          <strong>✅ Nivel superado</strong>
          <span>Validaste el formulario completo, sin bugs. Podés reabrirlo para seguir probando otros valores.</span>
        </div>
      )}

      <div className="pg-level-cta">
        <Icon name="sparkle" size={22} />
        <div>
          <p>
            {completed
              ? "¿Querés seguir explorando el formulario?"
              : 'Todavía no completaste tu perfil. Apretá "Abrir formulario" para empezar.'}
          </p>
          <button type="button" className="btn btn--primary pg-case-btn" onClick={() => setModalOpen(true)}>
            {completed ? "Reabrir formulario" : "Abrir formulario"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} tone="default">
          <h3 className="pg-modal-title">
            <Icon name="sparkle" size={18} /> Completá tu perfil
          </h3>
          <p className="pg-modal-subtitle">
            Necesitamos estos datos para activar tu cuenta demo. (Es un formulario de prueba: no se
            guarda nada de verdad.)
          </p>

          <form className="pg-modal-form" onSubmit={handleSubmit} noValidate>
            <div className="pg-modal-row">
              <div className="pg-modal-col">
                <label className="pg-field-label">
                  Nombre <span className="pg-required">*</span>
                </label>
                <input
                  type="text"
                  className="pg-case-input"
                  value={values.nombre}
                  onChange={(e) => setValue("nombre", sanitizeNameInput(e.target.value))}
                  placeholder="Tu nombre"
                />
                {errors.nombre && <em className="pg-error">{errors.nombre}</em>}
              </div>

              <div className="pg-modal-col">
                <label className="pg-field-label">
                  Apellido <span className="pg-required">*</span>
                </label>
                <input
                  type="text"
                  className="pg-case-input"
                  value={values.apellido}
                  onChange={(e) => setValue("apellido", sanitizeNameInput(e.target.value))}
                  placeholder="Tu apellido"
                />
                {errors.apellido && <em className="pg-error">{errors.apellido}</em>}
              </div>
            </div>

            <label className="pg-field-label">
              Email <span className="pg-required">*</span>
            </label>
            <input
              type="text"
              className="pg-case-input"
              value={values.email}
              onChange={(e) => setValue("email", e.target.value)}
              placeholder="vos@dominio.com"
            />
            {values.email.length > 0 && (
              <ul className="pg-checklist">
                {emailChecks.map((c) => (
                  <li key={c.id} className={c.ok ? "pg-checklist--ok" : ""}>
                    <Icon name={c.ok ? "check" : "bug"} size={12} /> {c.label}
                  </li>
                ))}
              </ul>
            )}
            {errors.email && <em className="pg-error">{errors.email}</em>}

            <label className="pg-field-label">
              Contraseña <span className="pg-required">*</span>
            </label>
            <input
              type="password"
              className="pg-case-input"
              value={values.password}
              onChange={(e) => setValue("password", e.target.value)}
              placeholder="Ej: Abcd123!"
            />
            <ul className="pg-checklist">
              {passwordChecks.map((c) => (
                <li key={c.id} className={c.ok ? "pg-checklist--ok" : ""}>
                  <Icon name={c.ok ? "check" : "bug"} size={12} /> {c.label}
                </li>
              ))}
            </ul>
            {errors.password && <em className="pg-error">{errors.password}</em>}

            <label className="pg-field-label">Cupón de descuento (opcional)</label>
            <input
              type="text"
              className="pg-case-input"
              value={values.cupon}
              onChange={(e) => setValue("cupon", e.target.value)}
              placeholder='Probá "QA2026"'
            />
            {errors.cupon && <em className="pg-error">{errors.cupon}</em>}

            <label className="pg-checkbox pg-modal-checkbox">
              <input
                type="checkbox"
                checked={values.terminos}
                onChange={(e) => setValue("terminos", e.target.checked)}
              />
              <span>
                Acepto los términos y condiciones <span className="pg-required">*</span>
              </span>
            </label>
            {errors.terminos && <em className="pg-error">{errors.terminos}</em>}

            <div className="pg-form-actions">
              <button type="submit" className="btn btn--primary pg-case-btn">
                Enviar formulario
              </button>
              <button type="button" className="pg-hint-toggle" onClick={() => setShowHints((s) => !s)}>
                <Icon name="lightbulb" size={14} /> Pistas
              </button>
            </div>
            {showHints && (
              <div className="pg-case-hint pg-modal-hints">
                {LEVEL1_CASES.map((c) => (
                  <p key={c.id}>
                    <strong>{c.label.replace(" (opcional)", "").replace(" (el formulario pide mínimo 8 caracteres)", "")}:</strong>{" "}
                    {c.hint}
                  </p>
                ))}
              </div>
            )}
          </form>
        </Modal>
      )}

      {rejection && (
        <Modal onClose={() => setRejection(null)} tone="danger">
          <h3 className="pg-modal-title pg-modal-title--danger">
            <Icon name="bug" size={18} /> Formulario rechazado
          </h3>
          <p className="pg-modal-subtitle">
            Che, todavía no — revisá los campos marcados en rojo y probá de nuevo. Vos podés 💪
          </p>
          <ul className="pg-rejection-list">
            {rejection.map((r) => {
              const message = r.passed
                ? (r.case.describeGap && r.case.describeGap(r.raw)) || r.case.shortError
                : r.case.bugText;
              return (
                <li key={r.case.id}>
                  <strong>{r.case.label}:</strong> {message}
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="btn btn--primary pg-case-btn"
            onClick={() => {
              setRejection(null);
              setModalOpen(true);
            }}
          >
            Reintentar
          </button>
        </Modal>
      )}
    </div>
  );
}
