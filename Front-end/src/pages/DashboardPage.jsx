import React from "react";
import {Users, FolderKanban, CheckCircle2, UserCheck} from "lucide-react";

function DashboardPage() {
    const [membrosCount, setMembrosCount] = React.useState(0);
    const [projetosAtivos, setProjetosAtivos] = React.useState(0);
    const [projetosConcluidos, setProjetosConcluidos] = React.useState(0);
    const [membrosDisponiveis, setMembrosDisponiveis] = React.useState(0);

    React.useEffect(() => {
        const carregaMetricas = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = {
                    Authorization: `Bearer ${token}`
                };

                const apiUrl = import.meta.env.VITE_API_URL;

                const respostaMembros = await fetch(`${apiUrl}/members/count`, { headers });
                if (respostaMembros.ok) {
                    const dadosMembros = await respostaMembros.json();
                    setMembrosCount(dadosMembros.count);
                }

                const respostaProjetos = await fetch(`${apiUrl}/projects/count`, { headers });
                if (respostaProjetos.ok) {
                    const dadosProjetos = await respostaProjetos.json();
                    const concluidos = dadosProjetos.filter(projeto => projeto.status === "Finalizado").length;
                    const ativos = dadosProjetos.filter(projeto => projeto.status !== "Finalizado").length;
                    setProjetosConcluidos(concluidos);
                    setProjetosAtivos(ativos);
                }
                const respostaOciosos = await fetch(`${apiUrl}/members/available/count`, { headers:{
                    Authorization: `Bearer ${token}`
                } });
                const data = await respostaOciosos.json();

                setMembrosDisponiveis(data.count);

            } catch (e) {
                console.error("Erro ao carregar métricas:", e);
            }
        };

        carregaMetricas();
    }, []);

    return (
        <div className="min-h-screen bg-mega-fundo p-8 space-y-8 font-sans">
            <div>
                <h1 className="text-3xl font-bold text-mega-amarelo tracking-tight">Dashboard</h1>
                <p className="text-white mt-1">Bem-vindo ao painel de controle do SouMega.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-mega-card p-5 rounded-xl border border-gray-800 shadow-lg flex items-center gap-4 hover:border-mega-roxo transition-colors duration-300">
                    <div className="p-3 bg-mega-roxo/20 text-mega-roxo rounded-lg">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">Membros na Empresa</p>
                        <p className="text-3xl font-bold text-white">{membrosCount}</p>
                    </div>
                </div>
                <div className="bg-mega-card p-5 rounded-xl border border-gray-800 shadow-lg flex items-center gap-4 hover:border-mega-amarelo transition-colors duration-300">
                    <div className="p-3 bg-mega-amarelo/20 text-mega-amarelo rounded-lg">
                        <FolderKanban className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">Projetos Ativos</p>
                        <p className="text-3xl font-bold text-white">{projetosAtivos}</p>
                    </div>
                </div>
                <div className="bg-mega-card p-5 rounded-xl border border-gray-800 shadow-lg flex items-center gap-4 hover:border-emerald-500 transition-colors duration-300">
                    <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">Projetos Concluídos</p>
                        <p className="text-3xl font-bold text-white">{projetosConcluidos}</p>
                    </div>
                </div>
                <div className="bg-mega-card p-5 rounded-xl border border-gray-800 shadow-lg flex items-center gap-4 hover:border-blue-500 transition-colors duration-300">
                    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">Membros Disponíveis</p>
                        <p className="text-3xl font-bold text-white">{membrosDisponiveis}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;