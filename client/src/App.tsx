import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchUser from "./pages/SearchUser";
import Todos from "./pages/Todos";
import User from "./pages/User";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchUser />} />
        <Route path="user/:userId" element={<User />} />
        <Route path="user/:userId/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}
