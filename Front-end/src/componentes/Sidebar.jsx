import { Link , useLocation ,useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FolderKanban , LogOut } from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const {logOut} = useAuth();

  const lidarLogout = async (e) => {
    e.preventDefault() 
    logOut();
    navigate("/login");
  };

  const linkStyle = (path) => `
        flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
        ${location.pathname === path 
        ? 'bg-mega-roxo text-white shadow-md shadow-blue-500/20' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
        `;

    return (
            <aside className="w-20 md:w-64 transition-all duration-300 bg-mega-card h-screen border-r border-gray-800 py-4 px-2 md:px-4 flex flex-col gap-2 shrink-0 sticky left-0 top-0 z-40">  
                <div className="flex items-center gap-2 px-4 py-3 mb-6 border-b border-gray-800 ">
                    <div className="w-8 h-8 bg-mega-roxo rounded-lg flex items-center justify-center text-mega-amarelo font-bold text-lg">
                        M
                    </div>
                    <span className="md:block text-xl font-bold text-mega-amarelo tracking-tight">SouMega</span>
                </div>     
                <nav className="flex flex-col gap-1 flex-1">
                    <Link to="/dashboard" className={linkStyle('/dashboard')}>
                    <LayoutDashboard className="w-5 h-5 shrink-0" />
                    <span className="hidden md:block">Dashboard</span>
                    </Link>
                    <Link to="/membros" className={linkStyle('/membros')}>
                    <Users className="w-5 h-5 shrink-0" />
                    <span className="hidden md:block">Membros</span>
                    </Link>
                    
                    <Link to="/projetos" className={linkStyle('/projetos')}>
                    <FolderKanban className="w-5 h-5 shrink-0" />
                    <span className="hidden md:block">Projetos</span>
                    </Link>
                </nav>
                <div className="pt-4 border-t border-gray-100 mt-auto">
                    <button onClick={lidarLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/20  hover:text-red-300 rounded-lg font-medium transition-all duration-200">
                        <LogOut className="w-5 h-5 shrink-0" />
                        <span className="hidden md:block">Sair do Sistema</span>
                     </button>
                </div>
            </aside>


    )
}

export default Sidebar;