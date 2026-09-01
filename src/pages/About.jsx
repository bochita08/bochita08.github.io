import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import { profile } from "../data/profile";
import photo from "../assets/photo.jpg";

export default function About() {
  return (
    <div className="page">
      <PageHeader eyebrow="Un poquito sobre mí" title="Sobre mí" />

      <section className="about-grid">
        <div className="about-photo-col">
          <img src={photo} alt={profile.fullName} className="about-photo" />
          <div className="about-photo-social">
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
          <div className="about-interests">
            <h3>Fuera del código</h3>
            <ul>
              {profile.interests.map((i) => (
                <li key={i}>
                  <Icon name="check" size={16} /> {i}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about-text-col">
          {profile.bio.map((p, i) => (
            <p key={i} className="about-paragraph">
              {p}
            </p>
          ))}

          <h3 className="about-subheading">Educación</h3>
          <div className="timeline timeline--compact">
            {profile.education.map((ed) => (
              <div className="timeline-item" key={ed.title}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h4>{ed.title}</h4>
                  <p className="timeline-place">{ed.place}</p>
                  <p className="timeline-period">{ed.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
