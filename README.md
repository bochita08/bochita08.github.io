# Hola, bienvenido/a 👋

Este es mi portfolio personal, hecho con cariño (y bastante café) para contar quién soy, en qué trabajé y qué sé hacer. Además del típico recorrido de un portfolio, tiene una sorpresa: un mini juego llamado **Playground QA**, donde te metés en el rol de tester y salís a cazar bugs sembrados a propósito en 3 niveles. Si te gusta el QA, la atención al detalle o simplemente los desafíos con onda, te invito a jugarlo — al final vas a ver un reporte con gráficos de tu propio desempeño.

Portfolio personal en React, con un "modal de entrada" donde el visitante escribe su nombre, y varias páginas navegables: Inicio, Sobre mí, Experiencia, Habilidades, Proyectos, Playground QA y Contacto.

Hecho con **React + Vite + React Router**, sin librerías de diseño externas (CSS propio, tema oscuro con acentos teal/violeta).

>>>> LINK: https://bochita08.github.io/

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

## 🎮 Playground QA

¿Curioso/a por probarlo? Es un mini juego de testing pensado para pasarla bien mientras mostrás (o entrenás) tu ojo de QA:

- **Nivel 1 · Formulario** — encontrá los valores que hacen fallar las validaciones.
- **Nivel 2 · Botón fantasma** — un botón no responde... ¿por qué?
- **Nivel 3 · Login con trampa** — un patrón oscuro y un texto roto esperando ser detectados.

Cada nivel se juega en orden, con una consolita tipo `test-runner.log` que va mostrando tus intentos en vivo. Al terminar los tres, accedés a un reporte final con gráficos de tus aciertos y un análisis de causa raíz de cada bug. Todo el progreso es local (se puede reiniciar en cualquier momento) — así que animate a jugarlo las veces que quieras.

## 🛠️ Funcionalidades para mostrar el oficio

Un pantallazo rápido de cosas que armé en este proyecto, como muestra de lo que sé hacer:

- Routing multi-página con React Router (rutas protegidas por el "login" de nombre).
- Estado global con Context API + persistencia en `localStorage` (sin backend).
- Mini juego completo con lógica de niveles, desbloqueo progresivo y reinicio de progreso.
- Gráficos (barras y dona) hechos a mano en SVG, sin librerías de charts.
- Consola de logs en vivo tipo terminal, con timestamps y auto-scroll.
- Sistema de íconos SVG propio, sin dependencias de íconos externas.
- Componentes reutilizables (modales, headers, tarjetas) y CSS propio con theming oscuro.
- Animación de confetti (CSS + React) para los momentos de logro.

## Cómo funciona el "login"

No es una autenticación real — es solo para personalizar el saludo. Cuando alguien entra por primera vez, ve una tarjeta pidiendo su nombre. Al confirmar, ese nombre se guarda en el `localStorage` de su navegador (no en ningún servidor) y se lo saluda en el Inicio y en la barra de navegación. El botón "Salir" borra ese nombre y vuelve a mostrar la tarjeta.

************************************************************