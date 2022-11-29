import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchUser from "./pages/SearchUser";
import OffsetTodos from "./pages/OffsetTodos";
import CursorTodos from "./pages/CursorTodos";
import User from "./pages/User";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchUser />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="user/:userId/offset-todos" element={<OffsetTodos />} />
        <Route path="user/:userId/cursor-todos/" element={<CursorTodos />} />
      </Routes>
    </BrowserRouter>
  );
}
