# bochita08.github.io — Portfolio de Nahuel Fortuna

Portfolio personal en React, con un "modal de entrada" donde el visitante escribe su nombre, y varias páginas navegables: Inicio, Sobre mí, Experiencia, Habilidades, Proyectos y Contacto.

Hecho con **React + Vite + React Router**, sin librerías de diseño externas (CSS propio, tema oscuro con acentos teal/violeta).

## Cómo probarlo en tu computadora

Necesitás tener [Node.js](https://nodejs.org/) instalado (versión 18 o superior).

```bash
npm install
npm run dev
```

Esto abre el sitio en `http://localhost:5173`. Los cambios que hagas en el código se ven al instante.

Para generar la versión de producción (lo que se termina subiendo a internet):

```bash
npm run build
npm run preview   # para probar esa build localmente antes de publicar
```

## Cómo editar el contenido (sin tocar diseño)

Casi todo el texto del sitio — nombre, bio, experiencia, educación, certificaciones, habilidades, proyectos, contacto — vive en un solo archivo:

```
src/data/profile.js
```

Ahí podés actualizar fechas, agregar un trabajo nuevo, sumar una certificación o cambiar la descripción de un proyecto sin tocar ningún componente. El resto de la página se arma sola a partir de ese archivo.

Las imágenes están en `src/assets/`:
- `photo.jpg` — tu foto (fondo removido)
- `logo.png` — el logo "AHCOB" (mascota hacker)
- `informatica.png` — infografía de conocimientos de ciberseguridad
- `proj-*.png` — capturas de proyectos anteriores (2024)

## Cómo publicarlo en bochita08.github.io

Este repo ya está pensado para tu repositorio **bochita08.github.io** (el repo especial de GitHub que se sirve directo en `https://bochita08.github.io`). Incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que compila y publica el sitio automáticamente cada vez que subís cambios a la rama `main`.

Pasos:

1. **Subí este código a tu repositorio** `bochita08.github.io` (reemplazando lo que tenga actualmente):

   ```bash
   git init
   git add .
   git commit -m "Nuevo portfolio en React"
   git branch -M main
   git remote add origin https://github.com/bochita08/bochita08.github.io.git
   git push -u origin main --force
   ```

   > ⚠️ El `--force` sobrescribe el contenido actual del repo (el formulario JS con ES6 que tenés publicado ahora). Si querés conservar ese código en otro lado antes, hacé una copia del repo actual primero.

2. En GitHub, andá a **Settings → Pages** del repositorio.
3. En "Build and deployment" → **Source**, elegí **GitHub Actions** (no "Deploy from a branch").
4. Listo. Cada `git push` a `main` dispara el workflow, compila el sitio y lo publica en `https://bochita08.github.io` en 1-2 minutos. Podés ver el progreso en la pestaña **Actions** del repo.

No hace falta configurar nada de `base` en Vite: al ser un repo de tipo *user page* (`usuario.github.io`), el sitio se sirve directo en la raíz del dominio.

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

## Créditos de contenido

Los textos de "Sobre mí", la infografía de ciberseguridad y las capturas de proyectos de 2024 fueron rescatados de tu CV/portfolio anterior (carpeta `CV WP` de tu escritorio) y adaptados para este sitio nuevo.
