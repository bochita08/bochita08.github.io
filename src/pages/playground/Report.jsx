import Icon from "../../components/Icon";
import { BarChart, Donut } from "./Charts";

function groupAttempts(attempts) {
  const map = new Map();
  attempts.forEach((a) => {
    const key = `${a.level}-${a.caseId}`;
    if (!map.has(key)) {
      map.set(key, { key, level: a.level, levelLabel: a.levelLabel, label: a.caseName, attempts: [] });
    }
    map.get(key).attempts.push(a);
  });
  return Array.from(map.values());
}

function fmt(ts) {
  return new Date(ts).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function Report({ attempts, levelStatus, onShowConclusion }) {
  const groups = groupAttempts(attempts);
  const passed = attempts.filter((a) => a.passed).length;
  const failed = attempts.length - passed;
  const levelsCompleted = Object.values(levelStatus).filter(Boolean).length;
  const rootCauses = groups
    .filter((g) => g.attempts.some((a) => !a.passed))
    .map((g) => {
      const lastFail = [...g.attempts].reverse().find((a) => !a.passed);
      return { key: g.key, label: `${g.levelLabel} · ${g.label}`, reason: lastFail?.reason };
    })
    .filter((rc) => rc.reason);

  if (attempts.length === 0) {
    return (
      <div className="pg-level">
        <div className="pg-report-empty">
          <Icon name="chart" size={30} />
          <p>Todavía no generaste datos para el reporte. Jugá algún nivel y volvé acá.</p>
        </div>
        <div className="pg-report-generated-row pg-report-generated-row--center">
          <button type="button" className="pg-conclusion-jump" onClick={onShowConclusion}>
            <Icon name="lightbulb" size={14} /> Ver conclusiones de QA Manual
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pg-level">
      <div className="pg-report-generated-row">
        <p className="pg-report-generated">Reporte generado: {fmt(new Date())}</p>
        <button type="button" className="pg-conclusion-jump" onClick={onShowConclusion}>
          <Icon name="lightbulb" size={14} /> Ver conclusiones
        </button>
      </div>

      <div className="pg-report-summary">
        <div className="pg-report-card">
          <span className="pg-report-card-value">{attempts.length}</span>
          <span className="pg-report-card-label">Intentos totales</span>
        </div>
        <div className="pg-report-card pg-report-card--pass">
          <span className="pg-report-card-value">{passed}</span>
          <span className="pg-report-card-label">Aciertos</span>
        </div>
        <div className="pg-report-card pg-report-card--fail">
          <span className="pg-report-card-value">{failed}</span>
          <span className="pg-report-card-label">Errores</span>
        </div>
        <div className="pg-report-card">
          <span className="pg-report-card-value">{levelsCompleted}/3</span>
          <span className="pg-report-card-label">Niveles superados</span>
        </div>
      </div>

      <div className="pg-report-charts">
        <div className="pg-report-chart-col">
          <h4>Intentos por caso</h4>
          <BarChart groups={groups} />
        </div>
        <div className="pg-report-chart-col pg-report-chart-col--donut">
          <h4>Aciertos vs. errores</h4>
          <Donut passed={passed} failed={failed} />
        </div>
      </div>

      {rootCauses.length > 0 && (
        <div className="pg-bugs">
          <h3>
            <Icon name="bug" size={18} /> Análisis de causa raíz ({rootCauses.length})
          </h3>
          {rootCauses.map((rc) => (
            <div className="pg-bug-card" key={rc.key}>
              <p className="pg-bug-title">{rc.label}</p>
              <p className="pg-bug-hint">{rc.reason}</p>
            </div>
          ))}
        </div>
      )}

      <div className="pg-report-detail">
        <h4>Detalle por caso</h4>
        {groups.map((g) => {
          const failCount = g.attempts.filter((a) => !a.passed).length;
          const last = g.attempts[g.attempts.length - 1];
          const showAll = failCount > 1;
          return (
            <div className="pg-report-group" key={g.key}>
              <div className="pg-report-group-head">
                <strong>
                  {g.levelLabel} · {g.label}
                </strong>
                <span className={last.passed ? "pg-tag pg-tag--pass" : "pg-tag pg-tag--fail"}>
                  {last.passed ? "Resuelto" : "Con bug"}
                </span>
              </div>
              <p className="pg-report-group-meta">
                {g.attempts.length} intento{g.attempts.length === 1 ? "" : "s"}
                {failCount > 0 ? ` · ${failCount} fallido${failCount === 1 ? "" : "s"}` : ""}
              </p>

              {showAll ? (
                <ul className="pg-attempt-list">
                  {g.attempts.map((a, i) => (
                    <li key={i} className={a.passed ? "pg-attempt--pass" : "pg-attempt--fail"}>
                      <span className="pg-attempt-ts">{fmt(a.timestamp)}</span>
                      <span className="pg-attempt-badge">{a.passed ? "PASS" : "FAIL"}</span>
                      <span className="pg-attempt-value">valor usado: "{a.inputUsed}"</span>
                      {!a.passed && a.reason && <span className="pg-attempt-reason">{a.reason}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={`pg-attempt-single ${last.passed ? "pg-attempt--pass" : "pg-attempt--fail"}`}>
                  <span className="pg-attempt-ts">{fmt(last.timestamp)}</span>
                  <span className="pg-attempt-badge">{last.passed ? "PASS" : "FAIL"}</span>
                  <span className="pg-attempt-value">valor usado: "{last.inputUsed}"</span>
                  {!last.passed && last.reason && <span className="pg-attempt-reason">{last.reason}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
