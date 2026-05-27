import React from "react";
import {Folder, Calendar, X} from 'lucide-react';
function ProjectPage() {

    const [projects, setProjects] = React.useState([
        {id: 1, name: "SouMega", status: "Em andamento", prazo : "2026-06-15", descricao: "Sistema de gerenciamento interno e alocação de membros da Mega Jr."},
        {id: 2, name: "projeto x", status: "Planejamento", prazo : "2026-07-18", descricao: "Projeto de desenvolvimento de software"},
        {id: 3, name: "App Y", status: "Finalizado", prazo : "2026-05-20", descricao: "Aplicativo para gerenciamento de tarefas"}
    ]);
    const [AbrirModal, setAbrirModal] = React.useState(false);
    const [selectedProject, setSelectedProject] = React.useState(null);

    const AbrirDescricao = (project) => {
        setSelectedProject(project);
        setAbrirModal(true);
    }

    const FecharModal = () => {
        setSelectedProject(null);
        setAbrirModal(false);
    }

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans text-gray-800">
        <div className ="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                <Folder className="w-6 h-6" />
                Projetos
            </h1>
        </div>
        <div className="text-gray-700 italic text-sm mb-4">
        Clique em qualquer lugar da linha do projeto para ver a descrição e opções.
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm font-semibold">
                    <th className="p-4">Nome do Projeto</th>
              <th className="p-4">Status</th>
              <th className="p-4">Prazo Final</th>
            </tr>
          </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
                {projects.map((project) => (
                    <tr key={project.id} 
                        onClick={() => AbrirDescricao(project)}
                    className="hover:bg-gray-50 transition cursor-pointer group">
                        <td className="p-4 font-medium text-gray-900">{project.name}</td>
                        <td className="p-4">
                            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {project.status}
                            </span>
                        </td>               
                        <td className="p-4 text-gray-500 flex items-center gap-2">
                            <Calendar size={14} /> {project.prazo}
                        </td>
                        
                    </tr>
                ))}     
            </tbody>   
            </table>    
        </div>
        {AbrirModal && selectedProject && (
            <div className="fixed inset-0 bg-gray-500/30 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden animate-in fade-in duration-150">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">{selectedProject.name}</h2>
                        <button onClick={FecharModal} className="p-1 text-red-400 hover:text-red-600 rounded-md">
                        <X size={20} />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
                        <div className="mt-1">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {selectedProject.status}
                        </span>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prazo Final</span>
                        <p className="text-sm text-gray-700 flex items-center gap-2 mt-1">
                            <Calendar size={14} /> {selectedProject.prazo}
                        </p>
                    </div>

                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Descrição</span>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{selectedProject.descricao}</p>
                    </div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                            <button 
                            onClick={FecharModal}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default ProjectPage;