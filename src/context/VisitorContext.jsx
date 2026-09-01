import { createContext, useContext, useEffect, useState } from "react";

const VisitorContext = createContext(null);
const STORAGE_KEY = "nf-portfolio-visitor-name";

export function VisitorProvider({ children }) {
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      if (name) localStorage.setItem(STORAGE_KEY, name);
    } catch {
      /* localStorage puede fallar en navegación privada: no pasa nada, sigue en memoria */
    }
  }, [name]);

  const enter = (value) => setName(value.trim());
  const exit = () => {
    setName("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  };

  return (
    <VisitorContext.Provider value={{ name, enter, exit }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  const ctx = useContext(VisitorContext);
  if (!ctx) throw new Error("useVisitor debe usarse dentro de VisitorProvider");
  return ctx;
}
