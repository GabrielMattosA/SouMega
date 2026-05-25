import React from 'react';
import { ChevronRightIcon, X } from 'lucide-react';
function MemberPage() {
    
    const [membroSelecionado, setMembroSelecionado] = React.useState(null);

    const presidente = [
        { id: 1, nome: "Antonio Castro" }
    ];

    const diretores = [
        { id: 2, nome: "Jean Flávio" },
        { id: 3, nome: "Eduarda Moretto" }
    ];

    const membros = [
        { id: 4, nome: "Gabriel Mattos" },
        { id: 5, nome: "Heitor " },
        { id: 6, nome: "Diogo" }
    ];

    return (
        <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Membros da Mega</h1>

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
        </div>
        );
}
export default MemberPage;