import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Todos from './Todos';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}
