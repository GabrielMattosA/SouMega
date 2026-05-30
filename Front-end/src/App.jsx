import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MemberPage from './pages/membros/MemberPage';
import ProjectPage from './pages/projetos/ProjectPage';
import Sidebar from './componentes/Sidebar';
import DashboardPage from './pages/DashboardPage';

function RotaProtegida({children}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route 
          path="/*"
          element={
            <RotaProtegida>
              <div className = "flex min-h-screen bg-gray-50">
                <Sidebar />
                <main className="flex-1 p-6">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/membros" element={<MemberPage />} />
                    <Route path="/projetos" element={<ProjectPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </RotaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;