// ---------------------------------------------------------------------
// Nivel 1 — "Bug Hunt: Formulario"
//
// Estas son las funciones de validación REALES del formulario (con bugs
// sembrados a propósito), y una definición de qué DEBERÍAN hacer según
// el enunciado/spec de cada campo. El juego corre tu propio valor contra
// la función real y lo compara contra la spec — así el jugador explora
// el validador con sus propios datos, en vez de mirar un resultado fijo.
// ---------------------------------------------------------------------

export function validateName(value) {
  return value.trim().length > 0;
}

// Filtro de input en tiempo real para Nombre/Apellido: solo deja pasar
// letras (con tildes y ñ), espacios, guiones y apóstrofes — nada de
// números ni símbolos, para que ni siquiera se puedan llegar a escribir.
export function sanitizeNameInput(value) {
  return (value || "").replace(/[^A-Za-zÁÉÍÓÚÑÜáéíóúñü\s'-]/g, "");
}

export function validateEmail(value) {
  // BUG real: el regex solo acepta dominios que terminan en ".com"
  // (rechaza .com.ar, .net, .io, etc).
  return /^[^\s@]+@[^\s@]+\.com$/.test(value.trim());
}

// Checklist de email en vivo, al estilo de un panel de registro profesional:
// dos requisitos concretos que un QA testearía. El segundo usa la función
// real (con el bug adentro), así que un email tipo .com.ar queda sin
// tildar ahí — descubrible mientras escribís, no recién al enviar.
export function emailChecklist(value) {
  const v = (value || "").trim();
  return [
    { id: "at", label: "Contiene un @", ok: v.includes("@") },
    { id: "domain", label: "Tiene un dominio válido (ej: dominio.com)", ok: v.length > 0 && validateEmail(v) },
  ];
}

export function validatePassword(value) {
  const checks = passwordChecklist(value);
  return checks.every((c) => c.ok);
}

// Checklist de contraseña en vivo — los mismos requisitos que testearía
// un QA profesional en un registro real: longitud, mayúscula, minúscula,
// número y carácter especial. OJO: el ítem de longitud está redactado
// igual que el formulario ("mínimo 8"), pero el código de abajo exige 9
// — el mismo bug off-by-one, ahora visible mientras escribís en vez de
// recién al enviar.
export function passwordChecklist(value) {
  const v = value || "";
  return [
    { id: "len", label: "Mínimo 8 caracteres", ok: v.length >= 9 },
    { id: "upper", label: "Una letra mayúscula", ok: /[A-Z]/.test(v) },
    { id: "lower", label: "Una letra minúscula", ok: /[a-z]/.test(v) },
    { id: "number", label: "Un número", ok: /[0-9]/.test(v) },
    { id: "special", label: "Un carácter especial (!@#$%...)", ok: /[^A-Za-z0-9]/.test(v) },
  ];
}

export function validateCoupon(value) {
  // BUG real: no hace trim() de espacios antes de comparar.
  return value === "QA2026";
}

export function validateTerms(checked) {
  return checked === true;
}

export const LEVEL1_CASES = [
  {
    id: "nombre",
    field: "text",
    label: "Nombre",
    placeholder: "Tu nombre",
    default: "",
    spec: 'Un nombre vacío (o solo espacios) debería ser RECHAZADO; cualquier otro texto debería ser ACEPTADO.',
    run: (v) => validateName(v),
    expected: (v) => v.trim().length > 0,
    bugText: "Este validador no tiene bug conocido — es un buen caso de control para comparar.",
    shortError: "Ingresá tu nombre.",
    hint: "Cualquier nombre no vacío debería alcanzar acá — este campo funciona bien.",
  },
  {
    id: "apellido",
    field: "text",
    label: "Apellido",
    placeholder: "Tu apellido",
    default: "",
    spec: 'Un apellido vacío (o solo espacios) debería ser RECHAZADO; cualquier otro texto debería ser ACEPTADO.',
    run: (v) => validateName(v),
    expected: (v) => v.trim().length > 0,
    bugText: "Este validador reutiliza la misma lógica que Nombre (un simple string) — sin bug conocido.",
    shortError: "Ingresá tu apellido.",
    hint: "Igual que el nombre: cualquier apellido no vacío debería alcanzar.",
  },
  {
    id: "email",
    field: "text",
    label: "Email",
    placeholder: "vos@dominio.com",
    default: "",
    spec: "Cualquier email con formato válido (usuario@dominio.tld, con @ y un dominio) debería ser ACEPTADO, sin importar el dominio.",
    run: (v) => validateEmail(v),
    expected: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    bugText: 'El regex de email exige que el dominio termine exactamente en ".com" — por eso rechaza direcciones válidas como ".com.ar", ".net" o ".io".',
    shortError: 'Ese email quedó rechazado (probá que termine justo en ".com").',
    hint: 'Usá un email que termine exactamente en ".com" — con ".com.ar", ".net" o ".io" el sistema lo rechaza (ese es el bug).',
    describeGap: (v) => {
      const t = (v || "").trim();
      if (!t.includes("@")) return "Falta el @ — todo email necesita uno.";
      const [, domain] = t.split("@");
      if (!domain || !domain.includes(".")) return "Falta un dominio válido después del @ (ej: dominio.com).";
      return "Revisá el formato del email.";
    },
  },
  {
    id: "password",
    field: "text",
    label: "Contraseña",
    placeholder: "Ej: Abcd123!",
    default: "",
    spec: "El formulario pide mínimo 8 caracteres, con al menos una mayúscula, una minúscula, un número y un carácter especial.",
    run: (v) => validatePassword(v),
    expected: (v) =>
      v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v) && /[^A-Za-z0-9]/.test(v),
    bugText:
      'La validación exige 9 caracteres en el código, aunque el formulario (y el checklist) dicen "mínimo 8" — un clásico error off-by-one. El resto de los requisitos (mayúscula, minúscula, número, carácter especial) están bien implementados.',
    shortError: "La contraseña todavía no cumple todos los requisitos.",
    hint: 'Mirá el checklist mientras escribís: si todo está en verde salvo "mínimo 8 caracteres", el problema es que el código en realidad pide 9.',
    describeGap: (v) => {
      const missing = passwordChecklist(v).filter((c) => !c.ok);
      if (!missing.length) return null;
      return `Todavía falta: ${missing.map((c) => c.label.toLowerCase()).join(", ")}.`;
    },
  },
  {
    id: "cupon",
    field: "text",
    label: "Cupón de descuento (opcional)",
    placeholder: 'Probá "QA2026"',
    default: "",
    optional: true,
    spec: "El código 'QA2026' debería aplicar el descuento sin importar espacios de más al escribirlo.",
    run: (v) => validateCoupon(v),
    expected: (v) => v.trim() === "QA2026",
    bugText: "El cupón compara el valor tal cual, sin hacer trim() de espacios — un espacio de más lo invalida sin motivo.",
    shortError: "El cupón no matcheó.",
    hint: 'Si lo completás, escribilo justo así: "QA2026", sin espacios antes ni después.',
  },
  {
    id: "terminos",
    field: "checkbox",
    label: "Acepto los términos y condiciones",
    default: false,
    spec: "El checkbox debe estar tildado para poder continuar; destildado debería bloquear el envío.",
    run: (v) => validateTerms(v),
    expected: (v) => v === true,
    bugText: "Este validador tampoco tiene bug — otro buen caso de control.",
    shortError: "Tenés que aceptar los términos.",
    hint: "Tildá el checkbox — sin eso el envío queda bloqueado, a propósito.",
  },
];

// ---------------------------------------------------------------------
// Nivel 2 — "El botón fantasma"
// Cuatro tarjetas, cada una abre su propio modal. Tres funcionan (o al
// menos simulan funcionar de forma convincente); una tiene un bug real:
// el toggle de notificaciones responde bien, pero "Actualizar petición"
// nunca confirma que guardó — la función que llama al backend está vacía.
// ---------------------------------------------------------------------
export const LEVEL2_ITEMS = [
  { id: "email", label: "Cambiar email", icon: "mail" },
  { id: "exportar", label: "Exportar datos", icon: "download" },
  { id: "notificaciones", label: "Activar notificaciones", icon: "bell", broken: true },
  { id: "festejar", label: "Festejemos", icon: "sparkle" },
];

export const LEVEL2_EXPORT_FILE = "Test.sql";

// Emails "random" pero predeterminados para precargar el modal de
// "Cambiar email" — simulan una cuenta demo ya existente. Se elige uno
// al azar cuando se abre el nivel, y se aclara en la UI que es a propósito.
export const LEVEL2_RANDOM_EMAILS = [
  "usuario_ax82@mailinator.com",
  "cuenta.demo47@fakemail.io",
  "qa.tester391@sandboxmail.com",
  "prueba_2024@demoinbox.net",
  "invitado.x7@correotest.com",
];

export const LEVEL2_ROOT_CAUSE =
  'El modal de "Activar notificaciones" se ve y se comporta bien: el toggle prende y apaga al toque. Pero el botón "Actualizar petición" nunca llega a guardar ese cambio — la función que debería llamar al backend quedó vacía. El usuario cree que guardó, pero no pasó nada. Es un bug de front-end real.';

export const LEVEL2_FIX_MESSAGE =
  '¡Buen trabajo! 👏 Conectamos el botón "Actualizar petición" a la función que realmente guarda el cambio en el backend. Si volvés a probarlo ahora, sí va a confirmar que se guardó.';

// ---------------------------------------------------------------------
// Nivel 3 — "Login con trampa" (dark pattern)
// El link "¿Olvidaste tu contraseña?" no lleva a recuperar la cuenta:
// redirige a una vista promocional. Patrón oscuro real.
// ---------------------------------------------------------------------
export const LEVEL3_OPTIONS = [
  { id: "normal", text: "Me llevó a recuperar la contraseña normalmente" },
  { id: "nada", text: "No pasó nada al hacer clic" },
  { id: "promo", text: "Me redirigió a una oferta/promoción en vez de recuperar la cuenta" },
];

// Email y contraseña vienen fijos y no se pueden editar: el objetivo de
// este nivel no es probar el login en sí, sino los otros dos bugs.
export const LEVEL3_DEMO_EMAIL = "demo@nahuel.dev";
export const LEVEL3_DEMO_PASSWORD = "Demo1234!";

export const LEVEL3_ROOT_CAUSE =
  'El link "¿Olvidaste tu contraseña?" no apunta a la vista de recuperación de cuenta: en el código quedó redirigido a una ruta promocional. Es un patrón oscuro (dark pattern) real — existe en apps que intentan retenerte con una oferta en vez de resolver tu problema.';

// ---------------------------------------------------------------------
// Nivel 3 (bug 2) — verificación de texto: el subtítulo del login quedó
// con una variable de plantilla sin interpolar. Bug de copy/texto real.
// ---------------------------------------------------------------------
export const LEVEL3_SUBTITLE_BROKEN = "Bienvenido de nuevo, {{userName}} 👋";

export const LEVEL3_TEXT_OPTIONS = [
  { id: "ok", text: "El subtítulo está perfecto, no tiene ningún problema" },
  { id: "placeholder", text: 'Muestra una variable sin interpolar, tipo "{{userName}}", en vez del nombre real' },
  { id: "falta", text: "Le falta un signo de pregunta al final" },
];

export const LEVEL3_TEXT_ROOT_CAUSE =
  'El subtítulo quedó con la variable de plantilla sin reemplazar: dice "Bienvenido de nuevo, {{userName}}" en vez de mostrar el nombre real de quien inició sesión. Es un bug de texto/copy real — probablemente un fallback que nunca se completó al conectar el dato dinámico.';
