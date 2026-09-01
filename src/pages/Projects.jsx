import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import { profile } from "../data/profile";
import imgZapatillas from "../assets/proj-zapatillas.png";
import imgHuerta from "../assets/proj-huerta.png";
import imgFormulario from "../assets/proj-formulario.png";
import imgIphonexx4 from "../assets/proj-iphonexx4.png";
import imgCursosphp from "../assets/proj-cursosphp.png";
import imgContable from "../assets/proj-contable.png";
import imgMymachines from "../assets/proj-mymachines.jpg";
import imgPuntoycoma from "../assets/proj-puntoycoma.png";

const IMAGES = {
  zapatillas: imgZapatillas,
  huerta: imgHuerta,
  formulario: imgFormulario,
  iphonexx4: imgIphonexx4,
  cursosphp: imgCursosphp,
  contable: imgContable,
  mymachines: imgMymachines,
  puntoycoma: imgPuntoycoma,
};

export default function Projects() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Lo que fui construyendo"
        title="Proyectos"
        subtitle="Repos públicos y trabajos propios. El código está todo en mi GitHub."
      />

      <section className="projects-grid">
        {profile.projects.map((p) => (
          <div className="project-card" key={p.title}>
            {p.image && IMAGES[p.image] && (
              <div className="project-card-thumb">
                <img src={IMAGES[p.image]} alt="" loading="lazy" />
              </div>
            )}
            <div className="project-card-body">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="project-card-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="project-card-actions">
                {p.demoUrl && (
                  <a
                    className="project-card-btn project-card-btn--primary"
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="sparkle" size={14} /> Abrir proyecto
                  </a>
                )}
                <a
                  className="project-card-btn"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="github" size={14} /> Ver en GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="projects-note">
        <Icon name="github" size={18} />
        <p>
          Las capturas de "Proyectos 2024" pertenecen a trabajos anteriores maquetados en
          WordPress, PHP y React — quedaron en mi máquina en su momento, así que por ahora no
          tienen versión en vivo para abrir; el botón "Abrir proyecto" va a ir apareciendo a
          medida que despliegue cada uno. El código completo y los repos activos están en{" "}
          <a href={profile.github} target="_blank" rel="noreferrer">
            github.com/bochita08
          </a>
          .
        </p>
      </section>
    </div>
  );
}
