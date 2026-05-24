import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MemberPage from './pages/membros/MemberPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/membros" replace />} />
        
        <Route path="/membros" element={<MemberPage />} />
      </Routes>
    </BrowserRouter>
  )
}