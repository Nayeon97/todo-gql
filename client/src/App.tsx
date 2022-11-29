import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import OffsetTodos from './pages/OffsetTodos';
import CursorTodos from './pages/CursorTodos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="offset/@:userId" element={<OffsetTodos />} />
        <Route path="cursor/@:userId" element={<CursorTodos />} />
      </Routes>
    </BrowserRouter>
  );
}
