// Gráfico de barras horizontal (apilado PASS/FAIL) y gráfico de torta (donut),
// ambos hechos con divs/CSS puro — sin librerías externas.

export function BarChart({ groups }) {
  if (!groups.length) {
    return <p className="pg-empty">Todavía no hay intentos registrados para graficar.</p>;
  }
  return (
    <div className="pg-bars">
      {groups.map((g) => {
        const total = g.attempts.length || 1;
        const passCount = g.attempts.filter((a) => a.passed).length;
        const failCount = g.attempts.length - passCount;
        const passPct = (passCount / total) * 100;
        const failPct = 100 - passPct;
        return (
          <div className="pg-bar-row" key={g.key}>
            <span className="pg-bar-label">{g.label}</span>
            <div className="pg-bar-track">
              {passPct > 0 && (
                <div className="pg-bar-seg pg-bar-seg--pass" style={{ width: `${passPct}%` }} />
              )}
              {failPct > 0 && (
                <div className="pg-bar-seg pg-bar-seg--fail" style={{ width: `${failPct}%` }} />
              )}
            </div>
            <span className="pg-bar-count">
              {g.attempts.length} intento{g.attempts.length === 1 ? "" : "s"} · {passCount} ok / {failCount} err
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Donut({ passed, failed }) {
  const total = passed + failed;
  const pct = total ? Math.round((passed / total) * 100) : 0;
  const passDeg = total ? (passed / total) * 360 : 0;
  const style = {
    background:
      total === 0
        ? "conic-gradient(var(--surface-2) 0deg 360deg)"
        : `conic-gradient(#6ee7b7 0deg ${passDeg}deg, #ff8787 ${passDeg}deg 360deg)`,
  };
  return (
    <div className="pg-donut-wrap">
      <div className="pg-donut" style={style}>
        <div className="pg-donut-hole">
          <strong>{pct}%</strong>
          <span>OK</span>
        </div>
      </div>
      <ul className="pg-donut-legend">
        <li>
          <span className="pg-dotlegend pg-dotlegend--pass" /> Aciertos ({passed})
        </li>
        <li>
          <span className="pg-dotlegend pg-dotlegend--fail" /> Errores ({failed})
        </li>
      </ul>
    </div>
  );
}
