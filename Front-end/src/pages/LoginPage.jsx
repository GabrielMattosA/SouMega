    import React from "react";
    import { useNavigate } from "react-router-dom";
    import { useAuth } from "../contexto/AuthContext";

    function LoginPage () {
        const [rga, setRga] = React.useState("")
        const [senha, setSenha] = React.useState("")
        const [erro, setErro] = React.useState("")
        const { loginGlobal } = useAuth()
        const navigate = useNavigate();

        const lidarLogin = async (e) => {
            e.preventDefault()
            setErro("")

            if (!rga.trim() || !senha.trim()) {
                setErro("Preencha todos os campos")
                return
            }
            try {
                const resposta = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rga: rga.trim(),
                    password: senha.trim(),
                }),
            });

            const dados = await resposta.json();
            if (!resposta.ok) {
                throw new  Error(dados.error || "Falha ao realizar login.");
            }

            loginGlobal(dados.token);
            navigate("/");

            } catch (err) {
                setErro(err.message);
            }
        };
        return (
            <div className="min-h-screen bg-mega-fundo flex flex-col justify-center items-center p-4 font-sans">
                <div className="bg-mega-card py-4 px-6 rounded-xl shadow-md border border-gray-00 max-w-sm w-full">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-mega-amarelo">SouMega</h1>
                        <p className="text-sm text-gray-400 mt-2">Insira seu dados para acessar o sistema</p>
                    </div>

                    {erro && (
                        <div className="mb-4 bg-red-900/30 border border-red-800 text-red-300 px-3 py-2 rounded-lg text-sm font-medium text-center">
                            {erro}
                        </div>
                    )}
                    <form onSubmit={lidarLogin} className ="space-y-5">
                        <div>
                            <label className ="block text-sm font-medium text-mega-amarelo mb-1">RGA</label>
                            <input type="text" placeholder="Digite apenas números"
                            value={rga} onChange={(e) => setRga(e.target.value)} className="w-full bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mega-roxo transition-all"/>
                        </div>
                        <div>
                            <label className ="block text-sm font-medium text-mega-amarelo mb-1">Senha</label>
                            <input type="password" placeholder="Digite sua senha"
                            value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full bg-mega-fundo border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mega-roxo transition-all"/>
                        </div>
                        <button  type="submit" className="w-full bg-mega-roxo hover:bg-mega-roxo-escuro text-white font-bold py-2 px-4 rounded-lg text-sm transition shadow-md mt-2">
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    export default LoginPage;