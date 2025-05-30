// context/CityContext.js
"use client";
import { createContext, useContext, useState } from "react";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState(""); // shared state

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
