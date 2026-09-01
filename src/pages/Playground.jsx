import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import Confetti from "./playground/Confetti";
import Modal from "./playground/Modal";
import Level1 from "./playground/Level1";
import Level2 from "./playground/Level2";
import Level3 from "./playground/Level3";
import Report from "./playground/Report";
import Conclusion from "./playground/Conclusion";
import TestCaseLog from "./playground/TestCaseLog";

const TABS = [
  { id: "level1", label: "Nivel 1 · Formulario", icon: "bug" },
  { id: "level2", label: "Nivel 2 · Botón fantasma", icon: "target" },
  { id: "level3", label: "Nivel 3 · Login con trampa", icon: "lock" },
  { id: "report", label: "Reporte", icon: "chart" },
];

const LEVEL_META = {
  level1: {
    label: "Nivel 1 · Formulario",
    modalTitle: "¡Validaste todos los tests del Nivel 1!",
    modalBody: "Tu formulario pasó las validaciones sin ningún bug — buen trabajo encontrando los valores correctos.",
    nextLabel: "Ir al Nivel 2",
    nextTab: "level2",
  },
  level2: {
    label: "Nivel 2 · Botón fantasma",
    modalTitle: "¡Encontraste el botón fantasma!",
    modalBody: "Identificaste el botón roto y confirmaste la causa raíz. Vamos por el siguiente desafío.",
    nextLabel: "Ir al Nivel 3",
    nextTab: "level3",
  },
  level3: {
    label: "Nivel 3 · Login con trampa",
    modalTitle: "¡Superaste los dos bugs del Nivel 3!",
    modalBody: "Detectaste el patrón oscuro del login y el texto roto del subtítulo. Ya jugaste los 3 niveles — mirá cómo te fue.",
    nextLabel: "Ver el Reporte",
    nextTab: "report",
  },
};

function timestamp() {
  return new Date().toLocaleTimeString("es-AR", { hour12: false });
}

let attemptId = 0;

export default function Playground() {
  const [tab, setTab] = useState("level1");
  const [log, setLog] = useState([
    { ts: timestamp(), type: "info", text: "Consola lista. Elegí un nivel y empezá a investigar." },
  ]);
  const [attempts, setAttempts] = useState([]);
  const [levelStatus, setLevelStatus] = useState({ level1: false, level2: false, level3: false });
  const [completeModal, setCompleteModal] = useState(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [log]);

  const appendLog = (type, text) => {
    setLog((prev) => [...prev, { ts: timestamp(), type, text }]);
  };

  const recordAttempt = (attempt) => {
    attemptId += 1;
    setAttempts((prev) => [...prev, { ...attempt, id: attemptId, timestamp: new Date() }]);
  };

  const openCompleteModal = (levelKey) => {
    setLevelStatus((s) => ({ ...s, [levelKey]: true }));
    setConfettiKey((k) => k + 1);
    const meta = LEVEL_META[levelKey];
    appendLog("info", `▶ ${meta.label} completo — ¡todos los tests de este nivel pasaron!`);
    setCompleteModal({
      ...meta,
      onNext: () => {
        setCompleteModal(null);
        setTab(meta.nextTab);
      },
    });
  };

  const clearConsole = () => {
    setLog([{ ts: timestamp(), type: "info", text: "Consola reiniciada." }]);
  };

  // Acceso correlativo: Nivel 2 pide Nivel 1 superado, Nivel 3 pide Nivel 2.
  // Reporte (y Nivel 1) están siempre disponibles.
  const isLocked = (id) => {
    if (id === "level2") return !levelStatus.level1;
    if (id === "level3") return !levelStatus.level2;
    return false;
  };

  const goToTab = (id) => {
    if (isLocked(id)) {
      const meta = LEVEL_META[id === "level2" ? "level1" : "level2"];
      appendLog("fail", `🔒 Todavía no podés entrar a "${TABS.find((t) => t.id === id)?.label}" — completá primero "${meta.label}".`);
      return;
    }
    setTab(id);
  };

  const performReset = () => {
    setLevelStatus({ level1: false, level2: false, level3: false });
    setAttempts([]);
    setLog([
      { ts: timestamp(), type: "info", text: "Progreso reiniciado. Elegí un nivel y empezá de nuevo." },
    ]);
    setResetKey((k) => k + 1);
    setConfirmReset(false);
    setTab("level1");
  };

  const levelsDone = Object.values(levelStatus).filter(Boolean).length;

  return (
    <div className="page">
      <PageHeader
        eyebrow="Un poco de QA en vivo"
        title="Playground QA"
        subtitle="Tres niveles con bugs reales, sembrados a propósito. Explorá con tus propios datos, reportá lo que encontrás y mirá el reporte final con gráficos y análisis de causa."
      />

      {tab === "conclusion" ? (
        <Conclusion onBack={() => setTab("report")} />
      ) : (
        <>
          <div className="pg-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`pg-tab ${tab === t.id ? "pg-tab--active" : ""} ${
                  isLocked(t.id) ? "pg-tab--locked" : ""
                }`}
                onClick={() => goToTab(t.id)}
                title={isLocked(t.id) ? "Completá el nivel anterior primero" : undefined}
              >
                <Icon name={isLocked(t.id) ? "lock" : t.icon} size={15} />
                {t.label}
                {t.id !== "report" && levelStatus[t.id] && (
                  <Icon name="check" size={13} className="pg-tab-check" />
                )}
              </button>
            ))}
            <span className="pg-tabs-progress">{levelsDone}/3 niveles superados</span>
            <button type="button" className="pg-reset-btn" onClick={() => setConfirmReset(true)}>
              <Icon name="refresh" size={13} /> Reiniciar
            </button>
          </div>

          <div className="pg-grid">
            <div className="pg-main-col">
              {tab === "level1" && (
                <Level1
                  key={`level1-${resetKey}`}
                  onAttempt={recordAttempt}
                  onLog={appendLog}
                  onLevelComplete={() => openCompleteModal("level1")}
                  completed={levelStatus.level1}
                />
              )}
              {tab === "level2" && (
                <Level2
                  key={`level2-${resetKey}`}
                  onAttempt={recordAttempt}
                  onLog={appendLog}
                  onLevelComplete={() => openCompleteModal("level2")}
                  completed={levelStatus.level2}
                />
              )}
              {tab === "level3" && (
                <Level3
                  key={`level3-${resetKey}`}
                  onAttempt={recordAttempt}
                  onLog={appendLog}
                  onLevelComplete={() => openCompleteModal("level3")}
                  completed={levelStatus.level3}
                />
              )}
              {tab === "report" && (
                <Report
                  attempts={attempts}
                  levelStatus={levelStatus}
                  onShowConclusion={() => setTab("conclusion")}
                />
              )}
            </div>

            <div className="pg-console-col">
              <div className="pg-console" ref={consoleRef}>
                <div className="pg-console-head">
                  <span className="pg-dot pg-dot--r" />
                  <span className="pg-dot pg-dot--y" />
                  <span className="pg-dot pg-dot--g" />
                  <span className="pg-console-title">test-runner.log</span>
                  <button className="pg-console-clear" onClick={clearConsole}>
                    Limpiar
                  </button>
                </div>
                <div className="pg-console-body">
                  {log.map((entry, i) => (
                    <div key={i} className={`pg-log pg-log--${entry.type}`}>
                      <span className="pg-log-ts">[{entry.ts}]</span> {entry.text}
                    </div>
                  ))}
                </div>
              </div>

              <TestCaseLog attempts={attempts} />
            </div>
          </div>
        </>
      )}

      {confirmReset && (
        <Modal onClose={() => setConfirmReset(false)} tone="danger">
          <h3 className="pg-modal-title pg-modal-title--danger">
            <Icon name="refresh" size={18} /> ¿Reiniciar todo el Playground?
          </h3>
          <p className="pg-modal-subtitle">
            Se va a borrar el progreso de los 3 niveles, los intentos y el reporte actual, para que
            puedas jugarlo de nuevo desde cero.
          </p>
          <div className="pg-form-actions">
            <button type="button" className="btn btn--primary pg-case-btn" onClick={performReset}>
              Sí, reiniciar
            </button>
            <button type="button" className="pg-hint-toggle" onClick={() => setConfirmReset(false)}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      {completeModal && (
        <Modal onClose={() => setCompleteModal(null)} tone="success">
          <h3 className="pg-modal-title pg-modal-title--success">
            <Icon name="trophy" size={20} /> {completeModal.modalTitle}
          </h3>
          <p className="pg-modal-subtitle">{completeModal.modalBody}</p>
          <button type="button" className="btn btn--primary pg-case-btn" onClick={completeModal.onNext}>
            {completeModal.nextLabel} <Icon name="arrow" size={16} />
          </button>
        </Modal>
      )}
      <Confetti burstKey={confettiKey} />
    </div>
  );
}
