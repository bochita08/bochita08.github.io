import { HashRouter, Routes, Route } from "react-router-dom";
import { VisitorProvider, useVisitor } from "./context/VisitorContext";
import Gate from "./components/Gate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Playground from "./pages/Playground";
import Contact from "./pages/Contact";
import "./App.css";

function Site() {
  const { name, enter, exit } = useVisitor();

  if (!name) {
    return <Gate onEnter={enter} />;
  }

  return (
    <div className="site">
      <Navbar visitorName={name} onExit={exit} />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Welcome visitorName={name} />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/experiencia" element={<Experience />} />
          <Route path="/habilidades" element={<Skills />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <VisitorProvider>
      <HashRouter>
        <Site />
      </HashRouter>
    </VisitorProvider>
  );
}
