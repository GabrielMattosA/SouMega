
import { Link , useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FolderKanban } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) => `
        flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
        ${location.pathname === path 
        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
        `;

    return (
            <aside className="w-64 bg-white h-screen border-r border-gray-200 p-4 flex flex-col gap-2 fixed left-0 top-0 z-40">  
                <div className="flex items-center gap-2 px-4 py-3 mb-6 border-b border-gray-100">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        M
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">SouMega</span>
                </div>     
                <nav className="flex flex-col gap-1 flex-1">
                    <Link to="/dashboard" className={linkStyle('/dashboard')}>
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                    </Link>
                    <Link to="/membros" className={linkStyle('/membros')}>
                    <Users className="w-5 h-5" />
                    Membros
                    </Link>
                    
                    <Link to="/projetos" className={linkStyle('/projetos')}>
                    <FolderKanban className="w-5 h-5" />
                    Projetos
                    </Link>
                </nav>
            </aside>


    )
}

export default Sidebar;