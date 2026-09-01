# portf-welcome.github.io — Portfolio de Nahuel Fortuna

Portfolio personal en React, con un "modal de entrada" donde el visitante escribe su nombre, y varias páginas navegables: Inicio, Sobre mí, Experiencia, Habilidades, Proyectos y Contacto.

Hecho con **React + Vite + React Router**, sin librerías de diseño externas (CSS propio, tema oscuro con acentos teal/violeta).

## Cómo probarlo en tu computadora

Necesitás tener [Node.js](https://nodejs.org/) instalado (versión 18 o superior).

```bash
npm install
npm run dev
```

Esto abre el sitio en `http://localhost:5173`. Los cambios que hagas en el código se ven al instante.

```bash
npm run build
npm run preview   
```

## Estructura del proyecto

```
src/
  App.jsx              # Router + layout general
  index.css            # Variables de tema y reset
  App.css              # Todos los estilos del sitio
  context/
    VisitorContext.jsx # Guarda el nombre del visitante (localStorage)
  components/
    Gate.jsx           # Modal de entrada (pide el nombre)
    Navbar.jsx          # Barra de navegación
    Footer.jsx
    Icon.jsx            # Set de íconos SVG propio
    PageHeader.jsx
  pages/
    Welcome.jsx         # "Bienvenido, {nombre}" + ganchos de habilidades
    About.jsx
    Experience.jsx
    Skills.jsx
    Projects.jsx
    Contact.jsx
  data/
    profile.js          # ⭐ Toda tu información acá
  assets/                # Fotos, logo, capturas de proyectos
```

## Cómo funciona el "login"

No es una autenticación real — es solo para personalizar el saludo. Cuando alguien entra por primera vez, ve una tarjeta pidiendo su nombre. Al confirmar, ese nombre se guarda en el `localStorage` de su navegador (no en ningún servidor) y se lo saluda en el Inicio y en la barra de navegación. El botón "Salir" borra ese nombre y vuelve a mostrar la tarjeta.

************************************************************