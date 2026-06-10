import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MemberPage from './pages/membros/MemberPage';
import ProjectPage from './pages/projetos/ProjectPage';
import Sidebar from './componentes/Sidebar';
import DashboardPage from './pages/DashboardPage';
import PropTypes from 'prop-types';
import AuthProvider from './contexto/AuthContext';

function RotaProtegida({children}) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

RotaProtegida.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route 
          path="/*"
          element={
            <RotaProtegida>
              <div className = "flex min-h-screen w-full bg-gray-50">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto bg-mega-fundo">
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;