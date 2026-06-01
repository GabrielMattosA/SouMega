import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage () {
    const [rga, setRga] = React.useState("")
    const [erro, setErro] = React.useState("")
    const navigate = useNavigate();

    const lidarLogin = async (e) => {
        e.preventDefault()
        setErro("")

        if (!rga.trim()) {
            setErro("Preencha o RGA")
            return
        }
        try {
            const resposta = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rga: rga.trim()
            }),
        });

        const dados = await resposta.json();
        if (!resposta.ok) {
            throw new  Error(dados.error || "Falha ao realizar login.");
        }

        localStorage.setItem("token", dados.token);

        navigate("/");

        } catch (err) {
            setErro(err.message);
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 font-sans">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-sm w-full">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Sou Mega</h1>
                    <p className="text-sm text-gray-500 mt-1">Insira seu RGA para acessar o sistema</p>
                </div>

                {erro && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm font-medium">
                        {erro}
                    </div>
                )}
                <form onSubmit={lidarLogin} className ="space-y-4">
                    <div>
                        <label className ="block text-sm font-medium text-gray-700 mb-1">RGA</label>
                        <input type="text" placeholder="Ex: 0000.0000.000-0"
                        value={rga} onChange={(e) => setRga(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-blue-500"/>
                    </div>
                    <button  type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition shadow-sm mt-2">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;