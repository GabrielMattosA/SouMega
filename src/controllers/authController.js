//Importação do prisma e do JWT que vai servir para crair tokens
import prisma from "../prisma/client.js";
import jwt from "jsonwebtoken";

//Função de login utilizando o RGA
export async function login(req, res ) {
    const { rga } = req.body

    try {
        //Procura o úsuario com o rga informado no banco de dados
        const user = await prisma.member.findUnique({
            where: { rga }
        });
        
        //Se não encontrar o úsuario, bloqueia.
        if(!user){
            return res.status(404).({error: "RGA não encontrado."})
        };

        //Cria um token
        const token = jwt.sign(
            {id: user.id}, "xxxx", {expiresIn: "2h"}
        );

        res.json({token});
    } catch (error) {
    res.status(500).json({error: "Erro no login"})
    }
}