import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchUser from "./pages/SearchUser";
import Todos from "./pages/Todos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchUser />} />
        <Route path="todo/:userId" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}
