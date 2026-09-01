import { useState } from "react";
import Icon from "../../components/Icon";
import {
  LEVEL3_OPTIONS,
  LEVEL3_ROOT_CAUSE,
  LEVEL3_SUBTITLE_BROKEN,
  LEVEL3_TEXT_OPTIONS,
  LEVEL3_TEXT_ROOT_CAUSE,
  LEVEL3_DEMO_EMAIL,
  LEVEL3_DEMO_PASSWORD,
} from "./cases";

export default function Level3({ onAttempt, onLog, onLevelComplete, completed }) {
  const [view, setView] = useState("login"); // login | promo
  const [clickedForgot, setClickedForgot] = useState(false);
  const [loginToast, setLoginToast] = useState(false);

  const [dpChoice, setDpChoice] = useState("");
  const [dpResult, setDpResult] = useState(null);
  const [dpHint, setDpHint] = useState(false);
  const [dpSolved, setDpSolved] = useState(completed);

  const [textChoice, setTextChoice] = useState("");
  const [textResult, setTextResult] = useState(null);
  const [textHint, setTextHint] = useState(false);
  const [textSolved, setTextSolved] = useState(completed);
  // Las opciones del Bug #2 no se muestran de entrada — leerlas de una
  // sopla la respuesta. El jugador tiene que pedir verlas a propósito.
  const [showTextOptions, setShowTextOptions] = useState(false);

  const handleForgot = () => {
    setClickedForgot(true);
    setView("promo"); // BUG intencional: debería ir a "recuperar contraseña", no acá.
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginToast(true);
    window.setTimeout(() => setLoginToast(false), 1600);
  };

  const maybeComplete = (dp, text) => {
    if (dp && text) onLevelComplete();
  };

  const submitDp = (e) => {
    e.preventDefault();
    if (!dpChoice) return;
    const correct = dpChoice === "promo";
    const opt = LEVEL3_OPTIONS.find((o) => o.id === dpChoice);

    setDpResult({ correct, label: opt.text });
    if (correct) setDpSolved(true);

    onAttempt({
      level: 3,
      levelLabel: "Nivel 3 · Login con trampa",
      caseId: "dark-pattern",
      caseName: '¿Qué encontraste en "¿Olvidaste tu contraseña?"?',
      inputUsed: opt.text,
      passed: correct,
      reason: correct ? null : "Esa no es la respuesta — volvé a probar el link y prestá atención a dónde te lleva.",
    });
    onLog(correct ? "pass" : "fail", `Nivel 3 · Bug #1 (link roto) → ${correct ? "PASS" : "FAIL"} (elegiste: "${opt.text}")`);

    maybeComplete(correct || dpSolved, textSolved);
  };

  const submitText = (e) => {
    e.preventDefault();
    if (!textChoice) return;
    const correct = textChoice === "placeholder";
    const opt = LEVEL3_TEXT_OPTIONS.find((o) => o.id === textChoice);

    setTextResult({ correct, label: opt.text });
    if (correct) setTextSolved(true);

    onAttempt({
      level: 3,
      levelLabel: "Nivel 3 · Login con trampa",
      caseId: "text-bug",
      caseName: "¿Qué problema tiene el subtítulo del login?",
      inputUsed: opt.text,
      passed: correct,
      reason: correct ? null : "Todavía no — releé bien el subtítulo de arriba, letra por letra.",
    });
    onLog(correct ? "pass" : "fail", `Nivel 3 · Bug #2 (texto) → ${correct ? "PASS" : "FAIL"} (elegiste: "${opt.text}")`);

    maybeComplete(dpSolved, correct || textSolved);
  };

  return (
    <div className="pg-level">
      <p className="pg-level-intro">
        Panel de login simulado (no guarda ni valida nada de verdad) con <strong>dos bugs</strong> escondidos:
        uno en el link de recuperación y otro en el texto de la pantalla. Encontrá los dos para superar el nivel.
      </p>

      {view === "login" && (
        <div className="pg-l3-card">
          <h3>Iniciar sesión</h3>
          <p className="pg-l3-subtitle">{LEVEL3_SUBTITLE_BROKEN}</p>
          <p className="pg-l3-locked-note">
            <Icon name="lock" size={13} /> El email y la contraseña ya vienen cargados y fijos, no hace
            falta que los pruebes: este ejercicio apunta a otra cosa. Explorá bien la pantalla.
          </p>
          <form className="pg-l3-form" onSubmit={handleLogin}>
            <label className="pg-field-label">Email</label>
            <input type="text" className="pg-case-input pg-case-input--locked" value={LEVEL3_DEMO_EMAIL} readOnly />
            <label className="pg-field-label">Contraseña</label>
            <input
              type="password"
              className="pg-case-input pg-case-input--locked"
              value={LEVEL3_DEMO_PASSWORD}
              readOnly
            />
            <button type="submit" className="btn btn--primary pg-case-btn">
              Iniciar sesión
            </button>
            <button type="button" className="pg-l3-forgot" onClick={handleForgot}>
              ¿Olvidaste tu contraseña?
            </button>
          </form>
          {loginToast && <div className="pg-l2-toast">✅ Sesión iniciada (simulada)</div>}
        </div>
      )}

      {view === "promo" && (
        <div className="pg-l3-promo">
          <span className="pg-l3-promo-badge">🎉 ¡Oferta especial!</span>
          <h3>50% OFF en el plan Premium</h3>
          <p>Aprovechá antes de que se acabe... esto no tiene nada que ver con recuperar tu cuenta.</p>
          <button type="button" className="btn btn--ghost pg-case-btn" onClick={() => setView("login")}>
            ← Volver al login
          </button>
        </div>
      )}

      {/* Bug #1: dark pattern del link de recuperación */}
      <div className="pg-guess-form">
        <label className="pg-field-label">
          Bug #1 —{" "}
          {clickedForgot
            ? '¿Qué encontraste al hacer clic en "¿Olvidaste tu contraseña?"?'
            : 'Primero probá el link "¿Olvidaste tu contraseña?" de arriba.'}
        </label>

        {dpSolved ? (
          <div className="pg-case-result pg-case-result--pass">
            <strong>✅ Resuelto</strong>
            <span>{LEVEL3_ROOT_CAUSE}</span>
          </div>
        ) : (
          clickedForgot && (
            <form onSubmit={submitDp}>
              <div className="pg-guess-options">
                {LEVEL3_OPTIONS.map((o) => (
                  <label key={o.id} className="pg-radio">
                    <input
                      type="radio"
                      name="l3guess-dp"
                      value={o.id}
                      checked={dpChoice === o.id}
                      onChange={(e) => setDpChoice(e.target.value)}
                    />
                    <span>{o.text}</span>
                  </label>
                ))}
              </div>
              <div className="pg-form-actions">
                <button type="submit" className="btn btn--primary pg-case-btn" disabled={!dpChoice}>
                  Reportar bug
                </button>
                <button type="button" className="pg-hint-toggle" onClick={() => setDpHint((s) => !s)}>
                  <Icon name="lightbulb" size={14} /> Pista
                </button>
              </div>
              {dpHint && (
                <p className="pg-case-hint">
                  Fijate bien qué pantalla apareció después del clic: ¿era un formulario para recuperar
                  la cuenta, o era otra cosa completamente distinta?
                </p>
              )}
              {dpResult && !dpResult.correct && (
                <div className="pg-case-result pg-case-result--fail">
                  <strong>🐞 Todavía no</strong>
                  <span>Volvé a hacer clic en el link y mirá con atención adónde te manda.</span>
                </div>
              )}
            </form>
          )
        )}
      </div>

      {/* Bug #2: verificación de texto del subtítulo */}
      <div className="pg-guess-form">
        <label className="pg-field-label">
          Bug #2 — ¿Notás algún texto en esta pantalla que se vea raro o incorrecto?
        </label>

        {textSolved ? (
          <div className="pg-case-result pg-case-result--pass">
            <strong>✅ Resuelto</strong>
            <span>{LEVEL3_TEXT_ROOT_CAUSE}</span>
          </div>
        ) : !showTextOptions ? (
          <div className="pg-bug2-intro">
            <p className="pg-info-note">
              <Icon name="lightbulb" size={13} /> Antes de elegir, volvé a mirar con atención todos los
              textos de la tarjeta de login de arriba, letra por letra.
            </p>
            <button
              type="button"
              className="btn btn--primary pg-case-btn"
              onClick={() => setShowTextOptions(true)}
            >
              Marcar qué encontré <Icon name="chevronDown" size={15} />
            </button>
          </div>
        ) : (
          <form onSubmit={submitText} className="pg-slide-down">
            <div className="pg-guess-options">
              {LEVEL3_TEXT_OPTIONS.map((o) => (
                <label key={o.id} className="pg-radio">
                  <input
                    type="radio"
                    name="l3guess-text"
                    value={o.id}
                    checked={textChoice === o.id}
                    onChange={(e) => setTextChoice(e.target.value)}
                  />
                  <span>{o.text}</span>
                </label>
              ))}
            </div>
            <div className="pg-form-actions">
              <button type="submit" className="btn btn--primary pg-case-btn" disabled={!textChoice}>
                Reportar bug
              </button>
              <button type="button" className="pg-hint-toggle" onClick={() => setTextHint((s) => !s)}>
                <Icon name="lightbulb" size={14} /> Pista
              </button>
            </div>
            {textHint && (
              <p className="pg-case-hint">
                Leé con atención todos los textos de la tarjeta de login, letra por letra — ¿aparece
                algo entre llaves dobles, tipo {"{{ }}"}?
              </p>
            )}
            {textResult && !textResult.correct && (
              <div className="pg-case-result pg-case-result--fail">
                <strong>🐞 Todavía no</strong>
                <span>Volvé a mirar con atención los textos de la tarjeta de login.</span>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
