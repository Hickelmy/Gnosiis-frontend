// src/App.tsx
import React from "react";
import AppRoutes from "./routes";
import { Navbar } from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
    <BrowserRouter basename="/">
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  </div>
  );
};

export default App;
