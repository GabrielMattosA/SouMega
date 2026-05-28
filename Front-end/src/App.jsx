import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MemberPage from './pages/membros/MemberPage';
import ProjectPage from './pages/projetos/ProjectPage';
import Sidebar from './componentes/Sidebar';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <main className="flex-1 pl-64 p-6 min-h-screen">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projetos" element={<ProjectPage />} />
            <Route path="/membros" element={<MemberPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}