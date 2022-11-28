import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchUser from "./pages/SearchUser";
import OffsetTodos from "./pages/OffsetTodos";
import CursorTodos from "./pages/CursorTodos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchUser />} />
        <Route path="user/offset-todos/:userId" element={<OffsetTodos />} />
        <Route path="user/cursor-todos/:userId" element={<CursorTodos />} />
      </Routes>
    </BrowserRouter>
  );
}
