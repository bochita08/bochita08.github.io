import { useRef, useState } from "react";
import Icon from "../../components/Icon";
import Modal from "./Modal";
import Confetti from "./Confetti";
import {
  LEVEL2_ITEMS,
  LEVEL2_ROOT_CAUSE,
  LEVEL2_EXPORT_FILE,
  LEVEL2_FIX_MESSAGE,
  LEVEL2_RANDOM_EMAILS,
} from "./cases";

export default function Level2({ onAttempt, onLog, onLevelComplete, completed }) {
  const [openModal, setOpenModal] = useState(null); // "email" | "exportar" | "notificaciones" | null
  const [opened, setOpened] = useState({});

  // Modal "Cambiar email" — precargado con un email "random" pero fijo, a
  // propósito (el texto no se puede editar), pero el botón "Actualizar
  // datos" sí funciona y confirma, como antes.
  const [emailValue] = useState(
    () => LEVEL2_RANDOM_EMAILS[Math.floor(Math.random() * LEVEL2_RANDOM_EMAILS.length)]
  );
  const [emailSaved, setEmailSaved] = useState(false);

  // Modal "Exportar datos"
  const [exportStage, setExportStage] = useState("idle"); // idle | loading | done

  // Modal "Activar notificaciones" — acá vive el bug (hasta que se "corrige").
  // "Actualizar petición" arranca deshabilitado: primero hay que mover el
  // toggle (hacer algún cambio) para que tenga sentido habilitar el botón.
  const [notifOn, setNotifOn] = useState(false);
  const [notifTouched, setNotifTouched] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateAttempted, setUpdateAttempted] = useState(false);
  const [bugFixed, setBugFixed] = useState(completed);
  const updateAttemptCount = useRef(0);

  // Botón "Festejemos"
  const [funKey, setFunKey] = useState(0);

  // Modal de "encontraste el bug → corregilo" (2 etapas antes del festejo final)
  const [bugModalStage, setBugModalStage] = useState(null); // null | "found" | "fixing" | "fixed"

  const openItem = (item) => {
    setOpened((prev) => ({ ...prev, [item.id]: true }));
    if (item.id === "festejar") {
      setFunKey((k) => k + 1);
      return;
    }
    setOpenModal(item.id);
  };

  const closeModal = () => setOpenModal(null);

  const handleUpdateEmail = () => {
    setEmailSaved(true);
    window.setTimeout(() => setEmailSaved(false), 2200);
  };

  const handleExport = () => {
    setExportStage("loading");
    window.setTimeout(() => setExportStage("done"), 900);
  };

  const toggleNotif = () => {
    setNotifOn((v) => !v);
    setNotifTouched(true);
  };

  const handleUpdateNotif = () => {
    setUpdating(true);
    setUpdateAttempted(true);
    updateAttemptCount.current += 1;
    const attemptNumber = updateAttemptCount.current;

    window.setTimeout(() => {
      setUpdating(false);
      if (bugFixed) return; // ya corregido: no hace falta seguir logueando intentos

      // BUG intencional: nunca confirma nada — la función que debería
      // guardar en el "backend" está vacía. El toggle de arriba sí
      // responde, pero esto no persiste nada. Cada intento queda
      // registrado como FAIL en la consola y en el reporte.
      onAttempt({
        level: 2,
        levelLabel: "Nivel 2 · Botón fantasma",
        caseId: "actualizar-notificaciones",
        caseName: "Actualizar petición (notificaciones)",
        inputUsed: `intento #${attemptNumber} · toggle ${notifOn ? "activado" : "desactivado"}`,
        passed: false,
        reason: "El botón no confirma ni persiste el cambio — la función que llama al backend está vacía.",
      });
      onLog("fail", `Nivel 2 · Actualizar petición → FAIL (intento #${attemptNumber}, nunca confirma nada)`);
    }, 900);
  };

  const [guess, setGuess] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const submitGuess = (e) => {
    e.preventDefault();
    if (!guess) return;
    const broken = LEVEL2_ITEMS.find((b) => b.broken);
    const correct = guess === broken.id;
    const guessedItem = LEVEL2_ITEMS.find((b) => b.id === guess);

    setLastResult({ correct, guessedLabel: guessedItem.label });

    onAttempt({
      level: 2,
      levelLabel: "Nivel 2 · Botón fantasma",
      caseId: "boton-roto",
      caseName: "¿Cuál acción no funciona en realidad?",
      inputUsed: guessedItem.label,
      passed: correct,
      reason: correct
        ? null
        : `Elegiste "${guessedItem.label}", pero esa acción sí confirma correctamente. Fijate cuál nunca te muestra un resultado.`,
    });
    onLog(correct ? "pass" : "fail", `Nivel 2 · Reporte de bug → ${correct ? "PASS" : "FAIL"} (elegiste: "${guessedItem.label}")`);

    if (correct) {
      // En vez de festejar de una, primero ofrecemos corregir el bug.
      setBugModalStage("found");
    }
  };

  const startFix = () => {
    setBugModalStage("fixing");
    window.setTimeout(() => setBugModalStage("fixed"), 1100);
  };

  const finishFix = () => {
    setBugFixed(true);
    setBugModalStage(null);
    onLevelComplete();
  };

  return (
    <div className="pg-level">
      <p className="pg-level-intro">
        Este panel simula una pantalla de configuración. Cada tarjeta abre su propio modal — probalas
        todas y prestá atención a cuál nunca termina de confirmarte nada. Cuando tengas una sospecha,
        reportala abajo.
      </p>

      <div className="pg-l2-panel">
        {LEVEL2_ITEMS.map((item) => (
          <button key={item.id} type="button" className="pg-l2-btn" onClick={() => openItem(item)}>
            <Icon name={item.icon} size={16} />
            {item.label}
            {opened[item.id] && <span className="pg-l2-clicks">abierto</span>}
          </button>
        ))}
      </div>

      {/* --- Modal: Cambiar email --- */}
      {openModal === "email" && (
        <Modal onClose={closeModal} tone="default">
          <h3 className="pg-modal-title">
            <Icon name="mail" size={18} /> Cambiar email
          </h3>
          <p className="pg-modal-subtitle">Este es el email registrado en tu cuenta demo.</p>
          <p className="pg-info-note">
            <Icon name="lock" size={13} /> El texto viene fijo a propósito, igual que el login del Nivel
            3 — no se puede editar. Pero sí podés confirmar los datos con el botón de abajo.
          </p>
          <label className="pg-field-label">Email</label>
          <input type="text" className="pg-case-input pg-case-input--locked" value={emailValue} readOnly />
          <div className="pg-form-actions">
            <button type="button" className="btn btn--primary pg-case-btn" onClick={handleUpdateEmail}>
              Actualizar datos
            </button>
          </div>
          {emailSaved && (
            <div className="pg-l2-toast pg-l2-toast--inline">✅ Datos actualizados (simulado)</div>
          )}
        </Modal>
      )}

      {/* --- Modal: Exportar datos --- */}
      {openModal === "exportar" && (
        <Modal onClose={closeModal} tone="default">
          <h3 className="pg-modal-title">
            <Icon name="download" size={18} /> Exportar datos
          </h3>
          <p className="pg-modal-subtitle">Se va a generar un dump con la información de tu cuenta.</p>
          <div className="pg-l2-file">
            <Icon name="file" size={26} />
            <div>
              <strong>{LEVEL2_EXPORT_FILE}</strong>
              <span>128 KB · listo para exportar</span>
            </div>
          </div>
          <div className="pg-form-actions">
            <button
              type="button"
              className="btn btn--primary pg-case-btn"
              onClick={handleExport}
              disabled={exportStage === "loading"}
            >
              {exportStage === "loading" ? "Exportando…" : "Exportar"}
            </button>
          </div>
          {exportStage === "done" && (
            <div className="pg-l2-toast pg-l2-toast--inline">✅ {LEVEL2_EXPORT_FILE} exportado</div>
          )}
        </Modal>
      )}

      {/* --- Modal: Activar notificaciones (acá vive el bug, hasta corregirlo) --- */}
      {openModal === "notificaciones" && (
        <Modal onClose={closeModal} tone="default">
          <h3 className="pg-modal-title">
            <Icon name="bell" size={18} /> ¿Deseás activar las notificaciones?
          </h3>
          <p className="pg-modal-subtitle">Vas a recibir avisos cuando haya novedades en tu cuenta.</p>

          <label className="pg-l2-toggle-row">
            <span>Notificaciones {notifOn ? "activadas" : "desactivadas"}</span>
            <button
              type="button"
              className={`pg-l2-toggle ${notifOn ? "pg-l2-toggle--on" : ""}`}
              onClick={toggleNotif}
              aria-pressed={notifOn}
            >
              <span className="pg-l2-toggle-knob" />
            </button>
          </label>

          <div className="pg-form-actions">
            <button
              type="button"
              className="btn btn--primary pg-case-btn"
              onClick={handleUpdateNotif}
              disabled={updating || !notifTouched}
            >
              {updating ? "Actualizando…" : "Actualizar petición"}
            </button>
          </div>
          {!notifTouched && (
            <p className="pg-l2-silence">Movés el toggle de arriba para habilitar "Actualizar petición".</p>
          )}
          {updateAttempted && !updating && bugFixed && (
            <div className="pg-l2-toast pg-l2-toast--inline">✅ Preferencia de notificaciones guardada</div>
          )}
          {updateAttempted && !updating && !bugFixed && (
            <p className="pg-l2-silence">¿Se habrá guardado? No hay ninguna confirmación acá abajo...</p>
          )}
        </Modal>
      )}

      {/* --- Modal: encontraste el bug → corregilo (2 etapas) --- */}
      {bugModalStage && (
        <Modal
          onClose={bugModalStage === "fixed" ? finishFix : () => setBugModalStage(null)}
          tone={bugModalStage === "fixed" ? "success" : "default"}
        >
          {bugModalStage === "found" && (
            <>
              <h3 className="pg-modal-title">
                <Icon name="bug" size={18} /> ¡Encontraste el bug!
              </h3>
              <p className="pg-modal-subtitle">{LEVEL2_ROOT_CAUSE}</p>
              <button type="button" className="btn btn--primary pg-case-btn" onClick={startFix}>
                <Icon name="refresh" size={15} /> Corregir bug
              </button>
            </>
          )}
          {bugModalStage === "fixing" && (
            <>
              <h3 className="pg-modal-title">
                <Icon name="refresh" size={18} /> Corrigiendo y verificando…
              </h3>
              <p className="pg-modal-subtitle">
                Conectando "Actualizar petición" a la función real y volviendo a probarlo.
              </p>
            </>
          )}
          {bugModalStage === "fixed" && (
            <>
              <h3 className="pg-modal-title pg-modal-title--success">
                <Icon name="trophy" size={20} /> ¡Corregido!
              </h3>
              <p className="pg-modal-subtitle">{LEVEL2_FIX_MESSAGE}</p>
              <button type="button" className="btn btn--primary pg-case-btn" onClick={finishFix}>
                Continuar
              </button>
            </>
          )}
        </Modal>
      )}

      {completed ? (
        <div className="pg-case-result pg-case-result--pass">
          <strong>✅ Nivel superado</strong>
          <span>{LEVEL2_ROOT_CAUSE}</span>
        </div>
      ) : (
        <form className="pg-guess-form" onSubmit={submitGuess}>
          <label className="pg-field-label">¿Cuál de estas acciones no funciona en realidad?</label>
          <div className="pg-guess-options">
            {LEVEL2_ITEMS.map((item) => (
              <label key={item.id} className="pg-radio">
                <input
                  type="radio"
                  name="l2guess"
                  value={item.id}
                  checked={guess === item.id}
                  onChange={(e) => setGuess(e.target.value)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
          <div className="pg-form-actions">
            <button type="submit" className="btn btn--primary pg-case-btn" disabled={!guess}>
              Reportar bug
            </button>
            <button type="button" className="pg-hint-toggle" onClick={() => setShowHint((s) => !s)}>
              <Icon name="lightbulb" size={14} /> Pista
            </button>
          </div>
          {showHint && (
            <p className="pg-case-hint">
              Abrí las cuatro tarjetas y probá la acción principal de cada una — en notificaciones,
              primero movés el toggle. Tres te van a confirmar con un mensaje claro. Una se queda
              callada.
            </p>
          )}
          {lastResult && !lastResult.correct && (
            <div className="pg-case-result pg-case-result--fail">
              <strong>🐞 Todavía no</strong>
              <span>"{lastResult.guessedLabel}" sí termina confirmando correctamente. Probá con otra.</span>
            </div>
          )}
        </form>
      )}

      <Confetti burstKey={funKey} />
    </div>
  );
}
