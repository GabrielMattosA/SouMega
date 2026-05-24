import { ChevronRightIcon } from 'lucide-react';

function MemberPage() {
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
              <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold">
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
              <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold">
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
              <button className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded font-bold">
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MemberPage;