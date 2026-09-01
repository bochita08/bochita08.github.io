// Lista, debajo de la consola, TODOS los test cases ejecutados hasta ahora,
// enumerados y agrupados por nivel — un complemento fijo al log de consola
// y al reporte, siempre visible mientras se juega.
export default function TestCaseLog({ attempts }) {
  if (!attempts.length) {
    return (
      <div className="pg-caselog">
        <h4>Test cases ejecutados</h4>
        <p className="pg-empty">Todavía no corriste ningún test case.</p>
      </div>
    );
  }

  const groups = [1, 2, 3]
    .map((level) => {
      const items = attempts.filter((a) => a.level === level);
      return { level, label: items[0]?.levelLabel || `Nivel ${level}`, items };
    })
    .filter((g) => g.items.length > 0);

  return (
    <div className="pg-caselog">
      <h4>Test cases ejecutados ({attempts.length})</h4>
      {groups.map((g) => (
        <div className="pg-caselog-group" key={g.level}>
          <p className="pg-caselog-level">{g.label}</p>
          <ol className="pg-caselog-list">
            {g.items.map((a, i) => (
              <li key={a.id} className={a.passed ? "pg-caselog--pass" : "pg-caselog--fail"}>
                <span className="pg-caselog-num">{i + 1}.</span>
                <span className="pg-caselog-name">{a.caseName}</span>
                <span className="pg-caselog-badge">{a.passed ? "PASS" : "FAIL"}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
