import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import { profile } from "../data/profile";

export default function Experience() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Trayectoria"
        title="Experiencia laboral"
        subtitle="Desarrollo, QA y administración contable — en paralelo."
      />

      <section className="timeline">
        {profile.experience.map((job) => (
          <div className="timeline-item timeline-item--job" key={job.role}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-job-head">
                <h3>{job.role}</h3>
                <span className="timeline-period timeline-period--badge">{job.period}</span>
              </div>
              <p className="timeline-place">
                {job.company} · {job.place}
              </p>
              <ul className="timeline-bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <PageHeader eyebrow="Formación complementaria" title="Certificaciones" />
      <section className="cert-grid">
        {profile.certifications.map((c) => (
          <div className="cert-card" key={c.name}>
            <Icon name="check" size={18} className="cert-check" />
            <div>
              <h4>{c.name}</h4>
              <p>
                {[c.org, c.year].filter(Boolean).join(" · ")}
                {c.note ? ` — ${c.note}` : ""}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
