import Icon from "../../components/Icon";

const QA_TAKEAWAYS = [
  {
    title: "Probá los límites, no solo el centro",
    text: 'El bug de la contraseña (8 vs. 9 caracteres) es un clásico "off-by-one": muchos errores reales viven justo en el borde de una condición, no en el medio. Cuando pruebes un mínimo o un máximo, probá exactamente en ese número.',
  },
  {
    title: "No te fíes solo del feedback visual",
    text: 'El toggle de notificaciones se veía y se sentía perfecto — pero el botón que debía guardar el cambio nunca confirmaba nada. Un componente puede "verse" funcional sin serlo: siempre confirmá el resultado final, no solo la reacción inmediata.',
  },
  {
    title: "El texto también es superficie de testing",
    text: 'Una variable de plantilla sin interpolar ({{userName}}) es un bug tan real como uno funcional. Revisar el copy — traducciones, textos dinámicos, mensajes de error — es parte del trabajo, no un detalle menor.',
  },
  {
    title: "Verificá que los links lleven adonde dicen",
    text: 'El link "¿Olvidaste tu contraseña?" prometía una cosa y hacía otra. Los patrones oscuros (dark patterns) se esconden detrás de textos inocentes — comprobar el destino real de cada acción es un chequeo simple que vale la pena automatizar.',
  },
  {
    title: "Explorá con tus propios datos",
    text: "Los casos de prueba predefinidos no alcanzan: los bugs más interesantes suelen aparecer cuando alguien prueba algo que nadie anticipó. La exploración manual con datos propios sigue siendo insustituible.",
  },
  {
    title: "Un buen reporte de bug es reproducible",
    text: "Cada intento en este reporte guarda fecha, hora, el valor exacto usado y la causa. Esa es la diferencia entre \"no anda\" y un reporte que cualquiera puede reproducir y arreglar sin tener que volver a preguntarte nada.",
  },
  {
    title: "Los espacios invisibles también rompen cosas",
    text: 'El cupón "QA2026" se rechazaba si tenía un espacio de más al final, porque el código comparaba el valor tal cual, sin hacer trim(). Los caracteres invisibles son una fuente clásica de bugs difíciles de detectar a simple vista — probá siempre con espacios de más y de menos.',
  },
  {
    title: "Después de corregir un bug, volvé a probarlo",
    text: 'Cuando arreglaste el botón "Actualizar petición" en el Nivel 2, recién ahí pudiste confirmar que el fix funcionaba. Una corrección sin una prueba de regresión que la confirme es solo una promesa: el testing no termina cuando alguien dice "ya está arreglado".',
  },
];

export default function Conclusion({ onBack }) {
  return (
    <div className="pg-conclusion-page">
      <button type="button" className="pg-conclusion-back" onClick={onBack}>
        <Icon name="arrowLeft" size={15} /> Volver al reporte
      </button>

      <div className="pg-conclusion pg-conclusion--page">
        <h3>
          <Icon name="lightbulb" size={18} /> Conclusión — Buenas prácticas de QA Manual
        </h3>
        <p className="pg-conclusion-intro">
          Cada bug de este Playground representa un tipo de error real que aparece una y otra vez en
          proyectos de verdad. Estas son las lecciones que se pueden sacar de los tres niveles:
        </p>
        <div className="pg-conclusion-grid">
          {QA_TAKEAWAYS.map((t) => (
            <div className="pg-conclusion-card" key={t.title}>
              <h4>{t.title}</h4>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
