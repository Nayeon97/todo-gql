import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Todos from "./Todos";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}
