import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import { profile } from "../data/profile";

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
        <svg
          className="cyber-showcase-art"
          viewBox="0 0 480 340"
          role="img"
          aria-label="Ilustración de una terminal de pentesting con un escudo de seguridad"
        >
          <defs>
            <linearGradient id="cyberBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#182541" />
              <stop offset="1" stopColor="#0e1626" />
            </linearGradient>
          </defs>

          <rect x="0.5" y="0.5" width="479" height="339" rx="14" fill="url(#cyberBg)" stroke="#223154" />

          {/* circuito de fondo */}
          <g stroke="#223154" strokeWidth="2" fill="none" opacity="0.7">
            <path d="M20 300h70v-40h60" />
            <path d="M460 40h-80v50h-60" />
            <path d="M40 40h40v30" />
            <path d="M440 300h-50v-30" />
          </g>
          <g fill="#4fd1c5" opacity="0.55">
            <circle cx="20" cy="300" r="3" />
            <circle cx="150" cy="260" r="3" />
            <circle cx="460" cy="40" r="3" />
            <circle cx="320" cy="90" r="3" />
            <circle cx="80" cy="70" r="3" />
            <circle cx="390" cy="270" r="3" />
          </g>

          {/* ventana de terminal */}
          <rect x="56" y="52" width="330" height="210" rx="10" fill="#0b1220" stroke="#223154" />
          <rect x="56" y="52" width="330" height="30" rx="10" fill="#131e33" />
          <rect x="56" y="72" width="330" height="10" fill="#131e33" />
          <circle cx="74" cy="67" r="4" fill="#ff8787" />
          <circle cx="90" cy="67" r="4" fill="#f6c85c" />
          <circle cx="106" cy="67" r="4" fill="#4fd1c5" />

          <g fontFamily="'JetBrains Mono', 'Fira Code', monospace" fontSize="11">
            <text x="72" y="108" fill="#4fd1c5">$ nmap -sV 10.0.0.5</text>
            <text x="72" y="130" fill="#9fb0cc">22/tcp   open  ssh</text>
            <text x="72" y="148" fill="#9fb0cc">80/tcp   open  http</text>
            <text x="72" y="166" fill="#9fb0cc">443/tcp  open  https</text>
            <text x="72" y="192" fill="#8b7cf6">$ hydra -L users.txt ...</text>
            <text x="72" y="214" fill="#9fb0cc">[STATUS] scanning target</text>
            <text x="72" y="236" fill="#4fd1c5">$ _</text>
          </g>
          <rect x="88" y="228" width="7" height="12" fill="#4fd1c5">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>

          {/* escudo */}
          <g transform="translate(330 176)">
            <path
              d="M0 -46 L40 -30 V6 C40 34 22 52 0 62 C-22 52 -40 34 -40 6 V-30 Z"
              fill="#131e33"
              stroke="#4fd1c5"
              strokeWidth="2.5"
            />
            <path d="M-16 2 l10 12 l22 -26" fill="none" stroke="#4fd1c5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </section>
    </div>
  );
}
