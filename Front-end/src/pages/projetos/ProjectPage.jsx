import React from "react";
import {FolderKanban, Calendar, X, Plus} from 'lucide-react';
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
                    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/members`, {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
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
                const respostaBusca = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
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
                const resposta = await fetch(`${import.meta.env.VITE_API_URL}/projects/${Editando.id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(novoProjeto)
                });
                if (!resposta.ok) throw new Error('Erro ao atualizar projeto');

                const projetoAtualizado = await resposta.json();
                setProjects(projects.map((p) => p.id === Editando.id ? projetoAtualizado : p));
                alert('Projeto atualizado com sucesso!');
                setEditando(null);
            } else {
                const resposta = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
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
            const resposta = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
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
    <div className="min-h-screen w-full bg-mega-fundo p-6 font-sans text-white">
        <div className ="max-w-6xl mx-auto"></div>
        <div className ="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3 text-white tracking-tight">
                <FolderKanban className="w-8 h-8 text-mega-amarelo" />
                Projetos
            </h1>
        </div>
        <button 
            onClick={() => {
                setEditando(null);
                setNovoProjeto({ name: "", status: "Planejamento", prazo: "", description: "", members: []});
                setCadastro(true);
            }}
            className="bg-mega-roxo hover:bg-mega-roxo-escuro text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors shadow-md text-sm mb-6" 
            >
                <Plus size={16} /> Novo Projeto
        </button>
        <div className="bg-mega-card rounded-xl shadow-lg border border-gray-800 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-800/50">
                    <tr className="border-b border-gray-800 text-gray-400 text-sm font-semibold tracking-wide">
                        <th className="p-5">Nome do Projeto</th>
                        <th className="p-5">Status</th>
                        <th className="p-5">Prazo Final</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-sm">
                    {projects.map((project) => (
                        <tr key={project.id} 
                            onClick={() => AbrirDescricao(project)}
                        className="hover:bg-gray-800/50 transition cursor-pointer group">
                            <td className="p-5 font-medium text-white">{project.name}</td>
                            <td className="p-5">
                                <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-mega-roxo/20 text-mega-roxo border border-mega-roxo/30">
                                    {project.status}
                                </span>
                            </td>               
                            <td className="p-5 text-gray-400 flex items-center gap-2">
                                <Calendar size={14} /> {project.prazo}
                            </td>
                        </tr>
                    ))}     
                </tbody>   
            </table>    
        </div>
            {AbrirModal && SelectedProject && (
                <div className="fixed inset-0 bg-gray-70  backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-mega-card rounded-xl shadow-2xl border border-gray-800 max-w-md w-full overflow-hidden animate-in fade-in duration-150">
                        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">{SelectedProject.name}</h2>
                            <button type="button" onClick={FecharModal} className="p-1 text-gray-400 hover:text-red-400 transition-colors rounded-md focus:outline-none">
                            <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-5">
                        <div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</span>
                            <div className="mt-2">
                            <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-mega-roxo/20 text-mega-roxo border border-mega-roxo/30">
                                {SelectedProject.status}
                            </span>
                            </div>
                        </div>
                        <div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Prazo Final</span>
                            <p className="text-sm text-gray-300 flex items-center gap-2 mt-2">
                                <Calendar size={14} /> {SelectedProject.prazo}
                            </p>
                        </div>

                        <div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Descrição</span>
                            <p className="text-sm text-gray-300 mt-2 leading-relaxedbg-mega-fundo p-4 rounded-lg border border-gray-800">{SelectedProject.description || "Nenhuma descrição fornecida."}</p>    
                        </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-gray-800 mt-8">
                                <div className="flex gap-2">
                                    <button 
                                        type="button" 
                                        onClick={() => prepararEdicao(SelectedProject)}
                                        className="px-4 py-2 bg-mega-amarelo/20 text-mega-amarelo hover:bg-mega-amarelo hover:text-gray-900 rounded-lg font-bold text-sm transition-colors border border-mega-amarelo/30 hover:border-mega-amarelo"
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
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <form onSubmit={SalvarProjeto} className="p-6 bg-mega-card rounded-xl shadow-2xl border border-gray-800 max-w-md w-full overflow-hidden animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <div className="pb-6 border-b border-gray-800 flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">
                            {Editando ? "Editar Projeto" : "Novo Projeto"}
                        </h2>
                        <button type="button" onClick={() => setCadastro(false)} className="p-0 text-red-500 hover:text-red-700 transition-colors rounded-md">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-300">Nome do Projeto</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Digite o nome do projeto" 
                                value={novoProjeto.name}
                                onChange={atualizaForms}
                                className="bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mega-roxo transition-all w-full" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
                            <select 
                                name="status" 
                                value={novoProjeto.status}
                                onChange={atualizaForms} 
                                className="w-full rounded-lg px-4 py-2.5 text-sm bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mega-roxo"
                            >
                                <option value="Planejamento">Planejamento</option>
                                <option value="Em andamento">Em andamento</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-300">Prazo Final</label>
                            <input 
                                type="date" 
                                name="prazo"
                                value={novoProjeto.prazo}
                                onChange={atualizaForms} 
                                className="w-full rounded-lg px-4 py-2.5 text-sm bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mega-roxo"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {(novoProjeto.members || []).map((memberId) => {
                                const dadosMembro = listaMembros.find((m) => m.id === memberId);
                                if (!dadosMembro) return null;
                                return (
                                    <div key={memberId} className="flex items-center gap-1 bg-mega-roxo/20 text-white border border-mega-roxo/30 px-2.5 py-1 rounded-md font-semibold text-xs">
                                        <span>{dadosMembro.name}</span>
                                        <button type="button" onClick={() => removerMembro(memberId)} className="hover:text-red-400 font-bold ml-1 focus:outline-none transition-colors">
                                            &times;
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-300">Adicionar Membros</label>
                            <input
                                type="text"
                                placeholder="Digite o nome do membro"
                                value={nomePesquisado}
                                onChange={(e) => setNomePesquisado(e.target.value)}
                                className="w-full bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mega-roxo transition-all"/>
                            {nomePesquisado.trim() !== "" && membrosFiltrados.length > 0 && (
                                <div className="absolute z-50 w-full bg-mega-card border border-gray-700 rounded-lg mt-2 shadow-2xl max-h-48 overflow-y-auto custom-scrollbar">
                                    {membrosFiltrados.map((membro) => (
                                        <button
                                            key={membro.id}
                                            type="button"
                                            onClick={() => adicionarMembro(membro.id)}
                                            className="w-full text-left px-4 py-3 text-sm hover:bg-gray-800 transition-colors flex justify-between items-center border-b border-gray-800 last:border-0"
                                            >
                                            <span className="font-medium text-white">{membro.name}</span>
                                            <span className="text-xs text-mega-amarelo font-medium">{membro.cargo}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-300">Descrição do Projeto</label>
                            <textarea 
                                rows="3"
                                name="description"
                                placeholder="Descreva brevemente os objetivos do projeto..." 
                                value={novoProjeto.description}
                                onChange={atualizaForms}
                                className="w-full bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-mega-roxo transition-all resize-none custom-scrollbar"
                            />
                        </div>
                        <div className="pt-6 mt-2 border-t border-gray-800 flex justify-end pb-2">
                            <button 
                                type="submit"
                                className="w-full px-6 py-3 bg-mega-roxo hover:bg-mega-roxo-escuro text-white rounded-lg font-bold transition-colors shadow-md text-sm"
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