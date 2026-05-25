import React from 'react';
import { ChevronRightIcon, X } from 'lucide-react';


function MemberPage() {
    
    const [membroSelecionado, setMembroSelecionado] = React.useState(null);
    const [Cadastro, setCadastro] = React.useState(false);

    const [novoMembro, setNovoMembro] = React.useState({
        nome: '',
        rga: '',
        email: '',
        cargo: '',
        diretoria: '',
        time: ''
    });

    const cadastrar = () => {
        const membroFormatado = {
            ...novoMembro,
            id: Date.now() // Gerar um ID único para o novo membro
        };
        if (novoMembro.cargo === 'Presidente') {
            setPresidente([...presidente, membroFormatado]);
        } else if (novoMembro.cargo === 'Diretor(a)') { 
            setDiretores([...diretores, membroFormatado]);
        } else {
            setMembros([...membros, membroFormatado]);
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
    
    const [presidente, setPresidente] = React.useState([
        { id: 1, nome: "Antonio Castro" }
    ]);

    const [diretores, setDiretores] = React.useState([
        { id: 2, nome: "Jean Flávio" },
        { id: 3, nome: "Eduarda Moretto" }
    ]);

    const [membros, setMembros] = React.useState([
        { id: 4, nome: "Gabriel Mattos" },
        { id: 5, nome: "Heitor " },
        { id: 6, nome: "Diogo" }
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
            {presidente.map((pessoa) => (
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
            {diretores.map((pessoa) => (
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
            {membros.map((pessoa) => (
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
                <div className= "space-y-2">
                <p><strong>Nome:</strong> {membroSelecionado.nome}</p>
                <p className="text-sm text-gray-500 italic mt-4">
                (Informações futuras)
                </p>
            </div>
            </div>
            </div>
        )}
        {Cadastro && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md max-h-[85vh] flex flex-col overflow-y-auto">
                <div className= "flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Cadastrar Novo Membro</h3>
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
                            {['Presidência', 'Projetos', 'Comercial', 'Marketing', 'Gestão de Pessoas'].map((diretoria) => (
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
                        Cadastrar
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