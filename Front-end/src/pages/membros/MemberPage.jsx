    import React from 'react';
    import { ChevronRight, X, Users, Plus } from 'lucide-react';

    function MemberPage() {
        
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
                        const resposta = await fetch(`http://localhost:3000/members/${Editando.id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(novoMembro)
                        });
                    if (!resposta.ok) throw new Error('Erro ao editar membro.');
                        const membroAtualizado = await resposta.json();
                        setMembrosDaMega(membrosDaMega.map((membro) => membro.id === Editando.id ? membroAtualizado : membro));
                        alert('Membro editado com sucesso!');
                        setEditando(null);
                    } else {
                    const resposta = await fetch('http://localhost:3000/members', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
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
                const resposta = await fetch(`http://localhost:3000/members/${id}`, {
                    method: 'DELETE'
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
                const resposta = await fetch('http://localhost:3000/members');
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
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">{titulo}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {membrosFiltrados.map((pessoa) => (
                            <div key={pessoa.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center hover:border-blue-300 transition">
                                <div>
                                    <p className="font-semibold text-gray-900">{pessoa.name}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{pessoa.diretoria} • {pessoa.time || 'Sem Time'}</p>
                                </div>
                                <button 
                                    onClick={() => setMembroSelecionado(pessoa)}
                                    className="p-1.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
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
            <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 flex gap-3 items-center"> 
                <Users className="w-8 h-8 text-blue-600" />
                Membros da Mega
            </h1>
            
            <div className="flex justify-start mb-4">
                <button onClick={() => { 
                    setEditando(null);
                    setNovoMembro({ name: '', rga: '', email: '', cargo: '', diretoria: '', time: '' });
                    setCadastro(true)}}
                    className=" flex items-center gap-2 px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-bold">
                <Plus size={16} /> Cadastrar Novo Membro
                </button>
            </div>
            <div className="space-y-8">
                {renderizaCargo("Presidente", "Presidente")}
                {renderizaCargo("Diretores(as)", "Diretor(a)")}
                {renderizaCargo("Membros", "Membro")}
            </div>

            {membroSelecionado && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                    <div className= "flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Detalhes do Membro</h3>
                    <button onClick={() => setMembroSelecionado(null)} className="text-red-500 hover:text-red-700 transition-colors">
                    <X className="w-6 h-6" />
                    </button>
                    </div>
                    <div className="space-y-3 text-sm text-gray-700">
                        <p><strong>Nome:</strong> {membroSelecionado.name}</p>
                        <p><strong>RGA:</strong> {membroSelecionado.rga || 'Não informado'}</p>
                        <p><strong>Email:</strong> {membroSelecionado.email || 'Não informado'}</p>
                        <p><strong>Cargo:</strong> {membroSelecionado.cargo || 'Não informado'}</p>
                        <p><strong>Diretoria:</strong> {membroSelecionado.diretoria || 'Não informado'}</p>
                        <p><strong>Time Principal:</strong> {membroSelecionado.time || 'Não informado'}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t flex justify-center gap-4">
                            <button 
                                onClick={() => excluirMembro(membroSelecionado.id)}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-bold text-sm transition-colors"
                            >
                                Excluir Membro
                            </button>
                            <button 
                                onClick={() => prepararEdicao(membroSelecionado)}
                                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded font-bold text-sm transition-colors"
                            >
                                Editar Membro
                            </button>
                        </div>
                </div>
                </div>
            )}
            {Cadastro && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <form onSubmit={salvarMembro} className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-[85vh] flex flex-col overflow-y-auto">
                    <div className= "flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">
                        {Editando ? 'Editar Membro' : 'Cadastrar Novo Membro'}
                    </h3>
                    <button onClick={() => setCadastro(false)} className="text-red-500 hover:text-red-700 transition-colors">
                    <X className="w-6 h-6" />
                    </button>
                    </div>
                    <div className= "space-y-2">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome Completo</label>
                            <input type="text" name="name" placeholder="Digite o nome completo" 
                            value={novoMembro.name}
                            onChange={atualizarForms}
                            className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">RGA</label>
                            <input type="text" name="rga" placeholder="Ex. 0000.0000.000-0" 
                            value={novoMembro.rga}
                            onChange={atualizarForms}
                            className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input type="email" name="email" placeholder="Digite o email institucional" 
                            value={novoMembro.email}
                            onChange={atualizarForms}
                            className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Cargo</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Presidente', 'Diretor(a)', 'Membro'].map((cargo) => (
                                    <label key={cargo} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer text-sm">
                                        <input type="radio" name="cargo" 
                                        value={cargo} 
                                        checked={novoMembro.cargo === cargo}
                                        onChange={atualizarForms}
                                        className="text-blue-500" />
                                        <span>{cargo}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Diretoria</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Presidência', 'Projetos', 'Comercial', 'Marketing', 'Gestão de Pessoas', 'Financeiro'].map((diretoria) => (
                                    <label key={diretoria} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer text-sm">
                                        <input type="radio" name="diretoria" 
                                        value={diretoria} 
                                        checked={novoMembro.diretoria === diretoria}
                                        onChange={atualizarForms}
                                        className="text-blue-500" />
                                        <span>{diretoria}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Time Principal</label>
                            <div className="grid grid-cols-2 gap-2">
                                {['Front-end', 'Back-end', 'UI/UX Design'].map((time) => (
                                    <label key={time} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer text-sm">
                                        <input type="radio" name="time" 
                                        value={time} 
                                        checked={novoMembro.time === time}
                                        onChange={atualizarForms}
                                        className="text-blue-500" />
                                        <span>{time}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                        <button type='submit' 
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-bold mt-4">
                            {Editando ? 'Salvar Alterações' : 'Cadastrar Membro'}
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            )}
            </div>
            
        );
    }
    export default MemberPage;