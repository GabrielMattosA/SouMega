import React from 'react';
import { ChevronRightIcon, X } from 'lucide-react';


function MemberPage() {
    
    const [membroSelecionado, setMembroSelecionado] = React.useState(null);
    const [Cadastro, setCadastro] = React.useState(false);
    const [Editando, setEditando] = React.useState(false);
    const [novoMembro, setNovoMembro] = React.useState({
        nome: '',
        rga: '',
        email: '',
        cargo: '',
        diretoria: '',
        time: ''
    });

    const cadastrar = () => {
        if (Editando) {
            const membrosAtualizados = membrosDaMega.map((membro) =>
                membro.id === Editando ? { ...membro, ...novoMembro, id: Editando } : membro
            );
            setMembrosDaMega(membrosAtualizados);
            setEditando(null);
        } else {
            const membroFormatado = {
                ...novoMembro,
                id: Date.now() // Gerar um ID único para o novo membro
            };
            setMembrosDaMega([...membrosDaMega, membroFormatado]);
        }
        setCadastro(false);

        setNovoMembro({
            nome: '',
            rga: '',
            email: '',
            cargo: '',
            diretoria: '',
            time: ''
        });
    };
    
    const excluirMembro = (id) => {
        setMembrosDaMega(membrosDaMega.filter((membro) => membro.id !== id));
        
        setMembroSelecionado(null);
    };

    const editarMembro = (membro) => {
        setNovoMembro(membro);

        setEditando(membro.id);

        setMembroSelecionado(null);

        setCadastro(true);
    };
    const [membrosDaMega, setMembrosDaMega] = React.useState([
        {   id: 1, 
            nome: "Antonio Castro",
            rga: "2026.0001.001-0", 
            email: "antonio@mega.com", 
            cargo: "Presidente", 
            diretoria: "Presidência", 
            time: "Front-end"

         },
        {   id: 2, 
            nome: "Jean Flávio",
            rga: "2026.0002.002-0",
            email: "jean@mega.com",
            cargo: "Diretor(a)",
            diretoria: "Gestão de Pessoas",
            time: "Back-end"
        },
        {   id: 3, 
            nome: "Eduarda Moretto",
            rga: "2026.0003.003-0",
            email: "eduarda@mega.com",
            cargo: "Diretor(a)",
            diretoria: "Marketing",
            time: "UI/UX Design"
        },
        {   id: 4, 
            nome: "Gabriel Mattos",
            rga: "2026.0004.004-0",
            email: "gabriel@mega.com",
            cargo: "Membro",
            diretoria: "Financeiro",
            time: "Front-end"
        },
        {   id: 5, 
            nome: "Heitor ",
            rga: "2026.0005.005-0",
            email: "heitor@mega.com",
            cargo: "Membro",
            diretoria: "Projetos",
            time: "Back-end"
        },
        {   id: 6, 
            nome: "Diogo",
            rga: "2026.0006.006-0",
            email: "diogo@mega.com",
            cargo: "Membro",
            diretoria: "Marketing",
            time: "Back-end"
        }
    ]);

    return (
        <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Membros da Mega</h1>
        
        <div className="flex justify-content mb-4">
            <button onClick={() => setCadastro(true)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-bold">
            Cadastrar Novo Membro
            </button>
        </div>
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Presidente</h2>
            <ul>
            {membrosDaMega.filter((pessoa) => pessoa.cargo === 'Presidente').map((pessoa) => (
                <li key={pessoa.id} className="flex items-center gap-4 mb-2">
                <span>{pessoa.nome}</span>
                <button onClick={() => setMembroSelecionado(pessoa)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold">
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
                </li>
            ))}
            </ul>
        </div>

        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Diretores</h2>
            <ul>
            {membrosDaMega.filter((pessoa) => pessoa.cargo === 'Diretor(a)').map((pessoa) => (
                <li key={pessoa.id} className="flex items-center gap-4 mb-2">
                <span>{pessoa.nome}</span>
                <button onClick={() => setMembroSelecionado(pessoa)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold">
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
                </li>
            ))}
            </ul>
        </div>

        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Membros</h2>
            <ul>
            {membrosDaMega.filter((pessoa) => pessoa.cargo === 'Membro').map((pessoa) => (
                <li key={pessoa.id} className="flex items-center gap-4 mb-2">
                <span>{pessoa.nome}</span>
                <button onClick={() => setMembroSelecionado(pessoa)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold">
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
                </li>
            ))}
            </ul>
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
                    <p><strong>Nome:</strong> {membroSelecionado.nome}</p>
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
                            onClick={() => editarMembro(membroSelecionado)}
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
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-[85vh] flex flex-col overflow-y-auto">
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
                        <input type="text" placeholder="Digite o nome completo" 
                        value={novoMembro.nome}
                        onChange={(e) => setNovoMembro({ ...novoMembro, nome: e.target.value })}
                        className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">RGA</label>
                        <input type="text" placeholder="Ex. 0000.0000.000-0" 
                        value={novoMembro.rga}
                        onChange={(e) => setNovoMembro({ ...novoMembro, rga: e.target.value })}
                        className="w-full border rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" placeholder="Digite o email institucional" 
                        value={novoMembro.email}
                        onChange={(e) => setNovoMembro({ ...novoMembro, email: e.target.value })}
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
                                    onChange={() => setNovoMembro({ ...novoMembro, cargo: cargo })}
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
                                    onChange={() => setNovoMembro({ ...novoMembro, diretoria: diretoria })}
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
                                    onChange={() => setNovoMembro({ ...novoMembro, time: time })}
                                    className="text-blue-500" />
                                    <span>{time}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                    <button type='button' onClick={cadastrar}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-bold mt-4">
                        {Editando ? 'Salvar Alterações' : 'Cadastrar Membro'}
                    </button>
                </div>
            </div>
            </div>
            </div>
        )}
        </div>
        
    );
}
export default MemberPage;