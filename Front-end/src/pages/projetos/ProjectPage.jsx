import React from "react";
import {Folder, Calendar, X, Plus} from 'lucide-react';
function ProjectPage() {

    const [projects, setProjects] = React.useState([]);
    const [AbrirModal, setAbrirModal] = React.useState(false);
    const [Cadastro, setCadastro] = React.useState(false);
    const [SelectedProject, setSelectedProject] = React.useState(null);
    const [Editando, setEditando] = React.useState(null);
    const [listaMembros, setListaMembros] = React.useState([]);
    const [nomePesquisado, setNomePesquisado] = React.useState("");

    const [novoProjeto, setNovoProjeto] = React.useState({
        name: "",
        status: "Planejamento",
        prazo: "",
        description: "",
        members: []
    });

    React.useEffect(() => {
        const buscaMembros = async () => {
            try {
                    const resposta = await fetch('http://localhost:3000/members', {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                        });
                if (!resposta.ok) return;
                const dados = await resposta.json();
                setListaMembros(dados);
            } catch (error) {
                console.error('Erro de rede ao buscar membros:', error);
                setListaMembros([
                    { id: 1, name: "Antonio Castro", cargo: "Presidente" },
                    { id: 2, name: "Beatriz Souza", cargo: "Diretor(a)" },
                    { id: 3, name: "Daniela Lima", cargo: "Membro" },
                    { id: 4, name: "Carlos Eduardo", cargo: "Membro" }
                ]);
            }
        };
        buscaMembros();
     }, []);

    React.useEffect(() => {
        const buscaProjects = async () => {
            try {
                const respostaBusca = await fetch('http://localhost:3000/projects', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    });
                if (!respostaBusca.ok) {
                    console.error('Erro ao buscar projetos');
                    return;
                }
                const dados = await respostaBusca.json();
                setProjects(dados);
            } catch (error) {
                console.error('Erro de rede ao buscar projetos:', error);
            }
        };
        buscaProjects();
    }, []);
    
    
    const membrosFiltrados = listaMembros.filter((membro) => {
        const batePesquisa = membro.name.toLowerCase().includes(nomePesquisado.toLowerCase());
        
        const jaSelecionado = novoProjeto.members.includes(membro.id);
        
        return batePesquisa && !jaSelecionado;
    });

    const adicionarMembro = (id) => {
        setNovoProjeto({
            ...novoProjeto,
            members: [...novoProjeto.members, id]
        });
        setNomePesquisado("");
    }

    const removerMembro = (id) => {
        const listaAtualizada = novoProjeto.members.filter((memberId) => memberId !== id);
        setNovoProjeto({
            ...novoProjeto,
            members: listaAtualizada
        });
    };

    const AbrirDescricao = (project) => {
        setSelectedProject(project);
        setAbrirModal(true);
    }

    const FecharModal = () => {
        setSelectedProject(null);
        setAbrirModal(false);
    }

    const atualizaForms = (e) => {
        const { name, value } = e.target;
    setNovoProjeto({
        ...novoProjeto,    
        [name]: value    
    });
    }

    const SalvarProjeto = async (e) => {
        e.preventDefault();
        if (!novoProjeto.name.trim() || !novoProjeto.prazo.trim()) {
            alert('Por favor, preencha o nome do projeto e o prazo final.');
            return;
        }
        try {
            if (Editando) {
                const resposta = await fetch(`http://localhost:3000/projects/${Editando.id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    body: JSON.stringify(novoProjeto)
                });
                if (!resposta.ok) throw new Error('Erro ao atualizar projeto');

                const projetoAtualizado = await resposta.json();
                setProjects(projects.map((p) => p.id === Editando.id ? projetoAtualizado : p));
                alert('Projeto atualizado com sucesso!');
                setEditando(null);
            } else {
                const resposta = await fetch('http://localhost:3000/projects', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(novoProjeto)
                });
                if (!resposta.ok) throw new Error('Erro ao criar projeto');

                const projetoCriado = await resposta.json()
                setProjects([...projects, projetoCriado]);
                alert('Projeto cadastrado com sucesso!');
            }
            setCadastro(false);

            setNomePesquisado("")

            setNovoProjeto({
                name: "",
                status: "Planejamento",
                prazo: "",
                description: "",
                members: []
            }); 
        } catch (error) {
            console.error('Erro ao salvar projeto:', error);
            alert('Ocorreu um erro ao salvar o projeto. Por favor, tente novamente.');
        }
    };

    const excluirProjeto = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) 
            try {
            const resposta = await fetch(`http://localhost:3000/projects/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            if (!resposta.ok) throw new Error('Erro ao excluir projeto');
            setProjects(projects.filter((project) => project.id !== id));
            FecharModal();
            alert('Projeto excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir projeto:', error);
            alert('Ocorreu um erro ao excluir o projeto. Por favor, tente novamente.');
        }
    };

    const prepararEdicao = (project) => {
        setEditando(project);
        setAbrirModal(false);

        setNovoProjeto({
            name: project.name,
            status: project.status,
            prazo: project.prazo,
            description: project.description,
            members: project.members || []
        });
        setCadastro(true);
    }

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans text-gray-800">
        <div className ="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                <Folder className="w-6 h-6" />
                Projetos
            </h1>
        </div>
        <button 
            onClick={() => {
                setEditando(null);
                setNovoProjeto({ name: "", status: "Planejamento", prazo: "", description: "", members: []});
                setCadastro(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition shadow-sm text-sm mb-4"
            >
                <Plus size={16} /> Novo Projeto
        </button>
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
            {AbrirModal && SelectedProject && (
                <div className="fixed inset-0 bg-gray-500/30 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden animate-in fade-in duration-150">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">{SelectedProject.name}</h2>
                            <button type="button" onClick={FecharModal} className="p-1 text-red-400 hover:text-red-600 rounded-md">
                            <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</span>
                            <div className="mt-1">
                            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {SelectedProject.status}
                            </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Prazo Final</span>
                            <p className="text-sm text-gray-700 flex items-center gap-2 mt-1">
                                <Calendar size={14} /> {SelectedProject.prazo}
                            </p>
                        </div>

                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Descrição</span>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{SelectedProject.description}</p>
                        </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                                <div className="flex gap-2">
                                    <button 
                                        type="button" 
                                        onClick={() => prepararEdicao(SelectedProject)}
                                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-bold text-sm transition-colors shadow-sm"
                                    >
                                        Editar Projeto
                                    </button>
                                    <button 
                                        type="button"                                onClick={() => excluirProjeto(SelectedProject.id)}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition-colors shadow-sm"
                                    >
                                        Excluir Projeto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        {Cadastro && (
            <div className="fixed inset-0 z-50 bg-black/50  flex items-center justify-center p-4">
                <form onSubmit={SalvarProjeto} className=" p-4 bg-white rounded-xl shadow-xl border border-gray-100 max-w-md w-full overflow-hidden animate-in fade-in duration-150">
                    <div className="pb-4 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">
                            {Editando ? "Editar Projeto" : "Novo Projeto"}
                        </h2>
                        <button type="button" onClick={() => setCadastro(false)} className="p-0 text-red-400 hover:text-red-600 rounded-md">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Nome do Projeto</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Digite o nome do projeto" 
                                value={novoProjeto.name}
                                onChange={atualizaForms}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-blue-500" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Status</label>
                            <select 
                                name="status" 
                                value={novoProjeto.status}
                                onChange={atualizaForms} 
                                className="w-full border rounded px-3 py-2 text-sm bg-white focus:outline-blue-500"
                            >
                                <option value="Planejamento">Planejamento</option>
                                <option value="Em andamento">Em andamento</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Prazo Final</label>
                            <input 
                                type="date" 
                                name="prazo"
                                value={novoProjeto.prazo}
                                onChange={atualizaForms} 
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-blue-500" 
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {(novoProjeto.members || []).map((memberId) => {
                                const dadosMembro = listaMembros.find((m) => m.id === memberId);
                                if (!dadosMembro) return null;
                                return (
                                    <div key={memberId} className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-semibold text-xs">
                                        <span>{dadosMembro.name}</span>
                                        <button type="button" onClick={() => removerMembro(memberId)} className="hover:text-blue-600 font-bold ml-1 focus:outline-none">
                                            &times;
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-700">Adicionar Membros</label>
                            <input
                                type="text"
                                placeholder="Digite o nome do membro"
                                value={nomePesquisado}
                                onChange={(e) => setNomePesquisado(e.target.value)}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-blue-500"
                            />
                            {nomePesquisado.trim() !== "" && membrosFiltrados.length > 0 && (
                                <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
                                    {membrosFiltrados.map((membro) => (
                                        <button
                                            key={membro.id}
                                            type="button"
                                            onClick={() => adicionarMembro(membro.id)}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors flex justify-between items-center"
                                        >
                                            <span className="font-medium text-gray-900">{membro.name}</span>
                                            <span className="text-xs text-gray-500">{membro.cargo}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">Descrição do Projeto</label>
                            <textarea 
                                rows="3"
                                name="description"
                                placeholder="Descreva brevemente os objetivos do projeto..." 
                                value={novoProjeto.description}
                                onChange={atualizaForms}
                                className="w-full border rounded px-3 py-2 text-sm focus:outline-blue-500 resize-none"
                            />
                        </div>
                        <div className="flex justify-end pt-4 border-t border-gray-100 mt-6 pb-2">
                            <button 
                                type="submit"
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-colors shadow-sm"
                            >
                                {Editando ? "Salvar Alterações" : "Cadastrar Projeto"}
                            </button>
                        </div>
                    </div> 
                </form>
            </div>
        )}
    </div>
  );
}

export default ProjectPage;