import React from "react";
import {Users, FolderKanban, CheckCircle2, UserCheck} from  "lucide-react";

function DashboardPage() {
    const [membrosCount, setMembrosCount] = React.useState(0);
    const [projetosCount, setProjetosCount] = React.useState(0);
    const [membrosDisponiveis, setMembrosDisponiveis] = React.useState(0);

    React.useEffect(() => {
        const carregaMetricas = async () => {
            try {
                let dadosMembros = [];
                let dadosProjetos = [];

                const respostaMembros = await fetch('http://localhost:3000/membros/count');
                if (respostaMembros.ok) {
                    dadosMembros = await respostaMembros.json();
                    setMembrosCount(dadosMembros.length);
                }
                const respostaProjetos = await fetch('http://localhost:3000/projetos/count');
                if (respostaProjetos.ok) {
                    dadosProjetos = await respostaProjetos.json();
                    setProjetosCount(dadosProjetos.length);
                }
                const idOcupados = new Set(dadosProjetos.map(projeto => projeto.membros.id));

                const ociosos = dadosMembros.filter(membro => !idOcupados.has(membro.id));

                setMembrosDisponiveis(ociosos.length);
            } catch (e) {
                console.error('Erro ao carregar métricas:', e);
            }
        };

        carregaMetricas();
    }, []);

    return (
        <div className="p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-950 tracking-tight">Dashboard</h1>
                <p className="text-gray-500 mt-1">Bem-vindo ao painel de controle do SouMega.</p>
            </div>
            <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Membros na Empresa</p>
                        <p className="text-2xl font-bold text-gray-900">{membrosCount}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                        <FolderKanban className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Projetos Ativos</p>
                        <p className="text-2xl font-bold text-gray-900">{projetosCount}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Projetos Concluídos</p>
                        <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Membros Disponíveis</p>
                        <p className="text-2xl font-bold text-gray-900">{membrosDisponiveis}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}       

export default DashboardPage;