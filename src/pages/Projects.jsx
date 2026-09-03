import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
import imgKioscoapi from "../assets/proj-kioscoapi.png";
import imgKioscopage from "../assets/proj-kioscopage.png";
import imgClaudio from "../assets/proj-claudio.png";
import imgPropplusE2e from "../assets/proj-propplus-e2e.png";

const IMAGES = {
  zapatillas: imgZapatillas,
  huerta: imgHuerta,
  formulario: imgFormulario,
  iphonexx4: imgIphonexx4,
  cursosphp: imgCursosphp,
  contable: imgContable,
  mymachines: imgMymachines,
  puntoycoma: imgPuntoycoma,
  kioscoapi: imgKioscoapi,
  kioscopage: imgKioscopage,
  claudio: imgClaudio,
  propplusE2e: imgPropplusE2e,
};

const PROJECT_COUNT = profile.projects.length;
const ALL_TAGS = [...new Set(profile.projects.flatMap((p) => p.tags))].sort((a, b) =>
  a.localeCompare(b)
);

export default function Projects() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <div className="page">
      <PageHeader
        eyebrow="Lo que fui construyendo"
        title="Proyectos"
        subtitle="Repos públicos y trabajos propios. El código está todo en mi GitHub."
      />

      <section className="projects-summary">
        <p className="projects-summary-count">
          {PROJECT_COUNT} proyecto{PROJECT_COUNT !== 1 ? "s" : ""}
        </p>
        <div className="projects-summary-tags">
          <div className="projects-summary-tags-track">
            {ALL_TAGS.map((t) => (
              <span key={`a-${t}`}>{t}</span>
            ))}
            {ALL_TAGS.map((t) => (
              <span key={`b-${t}`} aria-hidden="true">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-grid">
        {profile.projects.map((p) => (
          <div className="project-card" key={p.title}>
            {p.image && IMAGES[p.image] && (
              <div
                className="project-card-thumb"
                onClick={() => setLightbox({ src: IMAGES[p.image], title: p.title })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightbox({ src: IMAGES[p.image], title: p.title });
                  }
                }}
                aria-label={`Ver imagen de ${p.title} en grande`}
              >
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

      {lightbox &&
        createPortal(
          <div
            className="image-lightbox"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
          >
            <button
              className="image-lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Cerrar"
            >
              <Icon name="close" size={20} />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </div>
  );
}
