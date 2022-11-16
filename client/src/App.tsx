import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todos from "./page/Todos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}
