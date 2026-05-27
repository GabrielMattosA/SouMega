import React from "react";

function ProjectPage() {

    const [projects, setProjects] = React.useState([
        {id: 1, name: "SouMega", status: "Em andamento", prazo : "2026-06-15"},
        {id: 2, name: "projeto x", status: "Planejamento", prazo : "2026-07-18"},
        {id: 3, name: "App Y", status: "Finalizado", prazo : "2026-05-20"}
    ]);
  return (
    <div className="p-6 max-w-6xl mx-auto font-sans text-2xl">
        <div className ="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                Projetos
                </h1>
        </div>
        <div className="text-gray-700 italic text-sm">
            Lista de projetos em andamento, planejamento e finalizados.
        </div>
    </div>
  );
}

export default ProjectPage;