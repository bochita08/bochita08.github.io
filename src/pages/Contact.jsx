import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";
import { profile } from "../data/profile";

const CARDS = [
  {
    icon: "mail",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: "phone",
    label: "Teléfono",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "in/nahuel-fortuna",
    href: profile.linkedin,
  },
  {
    icon: "github",
    label: "GitHub",
    value: "@bochita08",
    href: profile.github,
  },
  {
    icon: "pin",
    label: "Ubicación",
    value: profile.location,
    href: null,
  },
];

export default function Contact() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="¿Hablamos?"
        title="Contacto"
        subtitle="Full Stack, QA o los dos — escribime y lo charlamos."
      />

      <section className="contact-grid">
        {CARDS.map((c) => {
          const content = (
            <>
              <div className="contact-icon">
                <Icon name={c.icon} size={20} />
              </div>
              <div>
                <p className="contact-label">{c.label}</p>
                <p className="contact-value">{c.value}</p>
              </div>
            </>
          );
          return c.href ? (
            <a
              key={c.label}
              className="contact-card contact-card--link"
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {content}
            </a>
          ) : (
            <div key={c.label} className="contact-card">
              {content}
            </div>
          );
        })}
      </section>

      <section className="contact-band">
        <p>
          ¿Preferís mandarme un mail directo? Escribime a{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a> y te respondo a la brevedad.
        </p>
      </section>
    </div>
  );
}
