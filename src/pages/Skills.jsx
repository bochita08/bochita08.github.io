import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import { profile } from "../data/profile";
import informatica from "../assets/informatica.jpg";

export default function Skills() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Caja de herramientas"
        title="Habilidades"
        subtitle="Lo que uso todos los días, agrupado por área."
      />

      <section className="skills-grid">
        {profile.skills.map((group) => (
          <div className="skill-card" key={group.category}>
            <div className="skill-card-head">
              <Icon name={group.icon} size={20} />
              <h3>{group.category}</h3>
            </div>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span className="skill-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="languages">
        <h3>Idiomas</h3>
        <div className="lang-grid">
          {profile.languages.map((l) => (
            <div className="lang-item" key={l.name}>
              <div className="lang-item-head">
                <span>{l.name}</span>
                <span>{l.level}</span>
              </div>
              <div className="lang-bar-bg">
                <div className="lang-bar-fill" style={{ width: `${l.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cyber-showcase">
        <div className="cyber-showcase-text">
          <h3>Ciberseguridad, mi otra pasión</h3>
          <p>
            Además del desarrollo y el testing, me formé en Ethical Hacking y Pentesting:
            hardening de servidores, reconocimiento OSINT, criptografía y uso de herramientas
            como Nmap, Wireshark, Burpsuite y Metasploit dentro de laboratorios controlados.
          </p>
        </div>
        <img src={informatica} alt="Conocimientos de ciberseguridad e informática" className="cyber-showcase-img" />
      </section>
    </div>
  );
}
