export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="page-header">
      {eyebrow && <p className="page-header-eyebrow">{eyebrow}</p>}
      <h1 className="page-header-title">{title}</h1>
      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
    </div>
  );
}
