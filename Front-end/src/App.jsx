import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MemberPage from './pages/membros/MemberPage';
import ProjectPage from './pages/projetos/ProjectPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/membros" replace />} />
        <Route path="/projetos" element={<ProjectPage />} />
        <Route path="/membros" element={<MemberPage />} />
      </Routes>
    </BrowserRouter>
  )
}