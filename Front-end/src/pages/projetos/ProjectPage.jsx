import React from "react";
import {Folder, Calendar} from 'lucide-react';
function ProjectPage() {

    const [projects, setProjects] = React.useState([
        {id: 1, name: "SouMega", status: "Em andamento", prazo : "2026-06-15"},
        {id: 2, name: "projeto x", status: "Planejamento", prazo : "2026-07-18"},
        {id: 3, name: "App Y", status: "Finalizado", prazo : "2026-05-20"}
    ]);
  return (
    <div className="p-6 max-w-6xl mx-auto font-sans text-gray-800">
        <div className ="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                <Folder className="w-6 h-6" />
                Projetos
            </h1>
        </div>
        <div className="text-gray-700 italic text-sm">
            Lista de projetos em andamento, planejamento e finalizados.
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
                    <tr key={project.id} className="hover:bg-gray-50 transition">
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
    </div>
  );
}

export default ProjectPage;