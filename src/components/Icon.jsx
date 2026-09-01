// Set de íconos mínimo, dibujados a mano en SVG (sin dependencias externas).
const paths = {
  code: "M8 6L2 12L8 18 M16 6L22 12L16 18",
  bug: "M9 9V6a3 3 0 0 1 6 0v3 M9 9h6 M9 9a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0v-4a5 5 0 0 0-5-5Z M4 12H2 M22 12h-2 M5 6l-2-2 M19 6l2-2 M5 18l-2 2 M19 18l2 2",
  shield: "M12 2l8 3.5v6c0 5-3.4 8.4-8 10.5-4.6-2.1-8-5.5-8-10.5v-6L12 2Z M9 12l2 2 4-4",
  ai: "M12 2v3 M12 19v3 M4.2 4.2l2 2 M17.8 17.8l2 2 M2 12h3 M19 12h3 M4.2 19.8l2-2 M17.8 6.2l2-2 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  cloud: "M7 18a4.5 4.5 0 0 1-1-8.9 5.5 5.5 0 0 1 10.6-1.9A4.5 4.5 0 0 1 17 18H7Z",
  team: "M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1 M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z M22 20v-1a3.5 3.5 0 0 0-2.5-3.4 M16 4.1a3.5 3.5 0 0 1 0 6.8",
  layers: "M12 2 2 7l10 5 10-5-10-5Z M2 17l10 5 10-5 M2 12l10 5 10-5",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  arrowLeft: "M19 12H5 M11 6l-6 6 6 6",
  chevronDown: "M6 9l6 6 6-6",
  menu: "M3 6h18 M3 12h18 M3 18h18",
  close: "M6 6l12 12 M18 6L6 18",
  github: "M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.1-.5 2V21",
  linkedin: "M6.5 9v9 M6.5 5.5v.01 M11 18v-5a3 3 0 0 1 6 0v5 M11 9v9",
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z M3 6l9 7 9-7",
  phone: "M4.5 3h4l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5L15 12.5l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5.5a2 2 0 0 1 1.5-2.5Z",
  pin: "M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  check: "M20 6 9 17l-5-5",
  sparkle: "M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2Z M19 15l.8 2.4L22 18l-2.2.6L19 21l-.8-2.4L16 18l2.2-.6L19 15Z",
  download: "M12 3v13 M7 11l5 5 5-5 M5 21h14",
  chart: "M4 20V10 M10 20V4 M16 20v-7 M22 20H2",
  trophy: "M7 4h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4Z M4 5h3v2a3 3 0 0 1-3 3 2 2 0 0 1-2-2c0-1.5 1-2.6 2-3Z M20 5h-3v2a3 3 0 0 0 3 3 2 2 0 0 0 2-2c0-1.5-1-2.6-2-3Z M12 12v4 M9 20h6 M12 16v4",
  lightbulb: "M9 18h6 M10 21h4 M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6V16h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z",
  lock: "M6 11V8a6 6 0 0 1 12 0v3 M5 11h14v9H5z M12 15v3",
  refresh: "M3 12a9 9 0 0 1 15.3-6.4L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-15.3 6.4L3 16 M3 21v-5h5",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M12 12h.01",
  bell: "M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6Z M10 19a2 2 0 0 0 4 0",
  file: "M7 3h7l5 5v13H7z M14 3v5h5 M9 12h6 M9 16h6",
};

export default function Icon({ name, size = 20, className = "" }) {
  const d = paths[name] || paths.sparkle;
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
