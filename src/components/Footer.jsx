import Icon from "./Icon";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} {profile.fullName}. Hecho con React.</p>
        <div className="footer-links">
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
    </footer>
  );
}
