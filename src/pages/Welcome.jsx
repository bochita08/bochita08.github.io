import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { profile } from "../data/profile";
import photo from "../assets/photo.jpg";

export default function Welcome({ visitorName }) {
  return (
    <div className="welcome">
      <section className="hero">
        <div className="hero-text">
          <p className="hero-greeting">
            <Icon name="sparkle" size={16} /> ¡Bienvenido/a, {visitorName}!
          </p>
          <h1 className="hero-title">
            Hola, soy <span className="hero-name">{profile.shortName}</span>
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-role-sub">{profile.roleSub}</p>
          <p className="hero-desc">
            Vengo del mundo administrativo-contable y llegué a la programación por curiosidad.
            Hoy desarrollo, testeo y rompo aplicaciones (de forma ética) para que funcionen mejor.
          </p>
          <div className="hero-cta">
            <Link to="/sobre-mi" className="btn btn--primary">
              Conocé mi historia <Icon name="arrow" size={18} />
            </Link>
            <Link to="/proyectos" className="btn btn--ghost">
              Ver proyectos
            </Link>
            <Link to="/playground" className="btn btn--ghost">
              <Icon name="bug" size={16} /> Playground QA
            </Link>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo-circle">
            <img src={photo} alt={profile.fullName} className="hero-photo" />
            <span className="hero-photo-ring" aria-hidden="true" />
          </div>
          <div className="hero-photo-social about-photo-social">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" size={18} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Icon name="mail" size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="hooks">
        {profile.hooks.map((hook) => (
          <div className="hook-card" key={hook.title}>
            <div className="hook-icon">
              <Icon name={hook.icon} size={22} />
            </div>
            <h3>{hook.title}</h3>
            <p>{hook.text}</p>
          </div>
        ))}
      </section>

      <section className="cta-band">
        <div>
          <h2>¿Buscás perfil Full Stack, QA o los dos?</h2>
          <p>Tengo experiencia real combinando desarrollo, testing y seguridad — te cuento cómo.</p>
        </div>
        <Link to="/contacto" className="btn btn--primary">
          Hablemos <Icon name="arrow" size={18} />
        </Link>
      </section>
    </div>
  );
}
