    import React from 'react';
    import { ChevronRight, X, Users, Plus } from 'lucide-react';
    import { useAuth } from '../../contexto/AuthContext';

    function MemberPage() {
        
        const { ehDiretor } = useAuth();
        const [membroSelecionado, setMembroSelecionado] = React.useState(null);
        const [Cadastro, setCadastro] = React.useState(false);
        const [Editando, setEditando] = React.useState(null);
        const [membrosDaMega, setMembrosDaMega] = React.useState([]);
        const [novoMembro, setNovoMembro] = React.useState({
            name: '',
            rga: '',
            email: '',
            cargo: '',
            diretoria: '',
            time: ''
        });

        const atualizarForms = (e) => {
            const { name, value } = e.target;
            setNovoMembro({ ...novoMembro, [name]: value });
        };

        const salvarMembro = async (e) => {
            e.preventDefault();
                if (!novoMembro.name.trim() || !novoMembro.email.trim() || !novoMembro.rga.trim()) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
                }
                try {
                    if (Editando) {
                        const resposta = await fetch(`${import.meta.env.VITE_API_URL}/members/${Editando.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                            body: JSON.stringify(novoMembro)
                        });
                    if (!resposta.ok) throw new Error('Erro ao editar membro.');
                        const membroAtualizado = await resposta.json();
                        setMembrosDaMega(membrosDaMega.map((membro) => membro.id === Editando.id ? membroAtualizado : membro));
                        alert('Membro editado com sucesso!');
                        setEditando(null);
                    } else {
                    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/members`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}` },
                        body: JSON.stringify(novoMembro)
                    });
                    if (!resposta.ok) throw new Error('Erro ao cadastrar membro.');
                    const membroCriado = await resposta.json();
                    setMembrosDaMega([...membrosDaMega, membroCriado]);
                    alert('Membro cadastrado com sucesso!');
                }
                setCadastro(false);
                setEditando(null);
                setNovoMembro({ name: '', rga: '', email: '', cargo: '', diretoria: '', time: '' });
            } catch (error) {
                console.error('Erro ao salvar membro:', error);
                alert('Ocorreu um erro ao salvar o membro. Por favor, tente novamente.');
            }
        };

        const excluirMembro = async (id) => {
            try {
                const resposta = await fetch(`${import.meta.env.VITE_API_URL}/members/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!resposta.ok) {
                    throw new Error('Erro ao excluir membro:');
                }
                setMembrosDaMega(membrosDaMega.filter((membro) => membro.id !== id));
                setMembroSelecionado(null);
                alert('Membro excluído com sucesso!');
            } catch (error) {
                console.error('Erro ao excluir membro:', error);
                alert('Ocorreu um erro ao excluir o membro. Por favor, tente novamente.');
            }
        };

        React.useEffect(() => {
            const membrosSalvos = async () => {
                try{
                    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/members`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
});
                if (!resposta.ok) {
                    console.error('Erro ao buscar membros:');
                    return;
                }
                const dados = await resposta.json();
                setMembrosDaMega(dados);
            }   catch (error) {
                console.error('O back não está rodando ou ocorreu um erro na requisição:', error);
                setMembrosDaMega([
                        { id: 1, name: "Antonio Castro (Local)", rga: "2026.0001.001-0", email: "antonio@mega.com", cargo:   "Presidente", diretoria: "Presidência", time: "Front-end" }
                ]);
                }
            };

            membrosSalvos();
        }, []);
        const prepararEdicao = (membro) => {
            setEditando(membro); 
            setMembroSelecionado(null); 
            setNovoMembro({
                name: membro.name,
                rga: membro.rga || '',
                email: membro.email || '',
                cargo: membro.cargo || '',
                diretoria: membro.diretoria || '',
                time: membro.time || ''
            });
            setCadastro(true); 
        };

        const renderizaCargo = (titulo, filtro) => {
            const membrosFiltrados = membrosDaMega.filter((pessoa) => pessoa.cargo === filtro);
            if (membrosFiltrados.length === 0) return null;
            return (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2">{titulo}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {membrosFiltrados.map((pessoa) => (
                            <div key={pessoa.id} className="bg-mega-card p-4 rounded-xl border border-gray-800 shadow-lg flex justify-between items-center hover:border-mega-roxo transition-colors duration-300">
                                <div>
                                    <p className="font-semibold text-white">{pessoa.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{pessoa.diretoria} • {pessoa.time || 'Sem Time'}</p>
                                </div>
                                <button 
                                    onClick={() => setMembroSelecionado(pessoa)}
                                    className="p-2 bg-mega-fundo hover:bg-mega-roxo/20 hover:text-mega-amarelo text-gray-400 rounded-lg transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
        return (
            <div className="min-h-screen w-full bg-mega-fundo p-8 font-sans text-white">
                <div className="max-w-7xl mx-auto"> 
            <h1 className="text-3xl font-bold mb-8 flex gap-3 items-center tracking-tight"> 
                <Users className="w-8 h-8 text-mega-amarelo" />
                Membros da Mega
            </h1>
            
            <div className="flex justify-start mb-8">
                {ehDiretor && (
                <button onClick={() => { 
                    setEditando(null);
                    setNovoMembro({ name: '', rga: '', email: '', cargo: '', diretoria: '', time: '' });
                    setCadastro(true)}}
                    className=" flex items-center gap-2 px-4 py-2 bg-mega-roxo hover:bg-mega-roxo-escuro text-white rounded-lg font-bold shadow-md transition-colors">
                <Plus size={16} /> Cadastrar Novo Membro
                </button>
                )}  
            </div>
            <div className="space-y-8">
                {renderizaCargo("Presidente", "Presidente")}
                {renderizaCargo("Diretores(as)", "Diretor(a)")}
                {renderizaCargo("Membros", "Membro")}
            </div>

            {membroSelecionado && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-mega-card border border-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md">
                    <div className= "flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Detalhes do Membro</h3>
                    <button onClick={() => setMembroSelecionado(null)} className="text-gray-400 hover:text-red-400 transition-colors">
                    <X className="w-6 h-6" />
                    </button>
                    </div>
                    <div className="space-y-4 text-sm text-gray-300">
                        <p><strong>Nome:</strong> {membroSelecionado.name}</p>
                        <p><strong>RGA:</strong> {membroSelecionado.rga || 'Não informado'}</p>
                        <p><strong>Email:</strong> {membroSelecionado.email || 'Não informado'}</p>
                        <p><strong>Cargo:</strong> {membroSelecionado.cargo || 'Não informado'}</p>
                        <p><strong>Diretoria:</strong> {membroSelecionado.diretoria || 'Não informado'}</p>
                        <p><strong>Time Principal:</strong> {membroSelecionado.time || 'Não informado'}</p>
                    </div>
                    {ehDiretor && (
                    <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end gap-3">
                            <button 
                                onClick={() => excluirMembro(membroSelecionado.id)}
                                className="px-4 py-2 bg-red-900/30 text-red-400 hover:bg-red-600 hover:text-white rounded-lg font-bold text-sm transition-colors border border-red-900/50 hover:border-red-600"
                            >
                                Excluir Membro
                            </button>
                            <button 
                                onClick={() => prepararEdicao(membroSelecionado)}
                                className="px-4 py-2 bg-mega-amarelo/20 text-mega-amarelo hover:bg-mega-amarelo hover:text-gray-900 rounded-lg font-bold text-sm transition-colors border border-mega-amarelo/30 hover:border-mega-amarelo"
                            >
                                Editar Membro
                            </button>
                        </div>
                    )}
                </div>
                </div>
            )}
            {Cadastro && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm">
                <form onSubmit={salvarMembro} className="bg-mega-card border border-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-y-auto custom-scrollbar">
                    <div className= "flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">
                        {Editando ? 'Editar Membro' : 'Cadastrar Novo Membro'}
                    </h3>
                    <button onClick={() => setCadastro(false)} className="text-red-500 hover:text-red-700 transition-colors">
                    <X className="w-6 h-6" />
                    </button>
                    </div>
                    <div className= "space-y-4">
                        <div>
                            <label className="block text-sm text-gray-300 font-medium mb-1">Nome Completo</label>
                            <input type="text" name="name" placeholder="Digite o nome completo" 
                            value={novoMembro.name}
                            onChange={atualizarForms}
                            className="w-full bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mega-roxo transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 font-medium mb-1">RGA</label>
                            <input type="text" name="rga" placeholder="Ex. 0000.0000.000-0" 
                            value={novoMembro.rga}
                            onChange={atualizarForms}
                            className="w-full bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mega-roxo transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input type="email" name="email" placeholder="Digite o email institucional" 
                            value={novoMembro.email}
                            onChange={atualizarForms}
                            className="w-full bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-mega-roxo transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 font-medium mb-2">Cargo</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Presidente', 'Diretor(a)', 'Membro'].map((cargo) => (
                                    <label key={cargo} className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 cursor-pointer text-sm text-gray-300 transition-colors">
                                        <input type="radio" name="cargo" 
                                        value={cargo} 
                                        checked={novoMembro.cargo === cargo}
                                        onChange={atualizarForms}
                                        className="accent-mega-roxo w-4 h-4" />
                                        <span>{cargo}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 mt-2">Diretoria</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Presidência', 'Projetos', 'Comercial', 'Marketing', 'Gestão de Pessoas', 'Financeiro'].map((diretoria) => (
                                    <label key={diretoria} className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 cursor-pointer text-sm text-gray-300 transition-colors">
                                        <input type="radio" name="diretoria" 
                                        value={diretoria} 
                                        checked={novoMembro.diretoria === diretoria}
                                        onChange={atualizarForms}
                                        className="accent-mega-roxo w-4 h-4" />
                                        <span>{diretoria}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2 mt-2">Time Principal</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Front-end', 'Back-end', 'UI/UX Design'].map((time) => (
                                    <label key={time} className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 cursor-pointer text-sm text-gray-300 transition-colors">
                                        <input type="radio" name="time" 
                                        value={time} 
                                        checked={novoMembro.time === time}
                                        onChange={atualizarForms}
                                        className="accent-mega-roxo w-4 h-4" />
                                        <span>{time}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="pt-6 mt-4 border-t border-gray-800">
                        <button type='submit' 
                        className="w-full px-4 py-3 bg-mega-roxo hover:bg-mega-roxo-escuro text-white rounded-lg font-bold transition-colors shadow-md">
                            {Editando ? 'Salvar Alterações' : 'Cadastrar Membro'}
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            )}
            </div>
        </div>
    );
}
export default MemberPage;