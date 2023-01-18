const express = require('express')
const router = express.Router()
const app = express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const Usuario = require('./rotas')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/jwt")
const dotenv = require('dotenv');

dotenv.config();

router.post('/cadastro', async (req,res,next)=>{   
    const isExist = await Usuario.findOne({
    where: {
        login: req.body.login
    }
})

if (isExist) {
    return res.status(400).json({ error: "Usuário já cadastrado!" })
}

const salt = await bcrypt.genSalt(10)

const hashed_password = await bcrypt.hash(req.body.senha, salt);

const dados_usuario = {
    login: req.body.login,
    nome: req.body.nome,
    senha: hashed_password,
}

const usuario = await Usuario.create(dados_usuario)

token = jwt.sign({ "id": usuario.id, "login": usuario.login, "nome": usuario.nome },
    jwtConfig.secret)
res.status(200).json({ token: token });
})

router.post("/login", async(req,res,next)=>{
    const usuario= await Usuario.findOne({
        where:{
            login:req.body.login
        }
    })

    if(usuario){
const senha_valida = await bcrypt.compare(req.body.senha,usuario.senha)

        if(senha_valida){
token = jwt.sign({"id":usuario.id,"login":usuario.login,"nome":usuario.nome},
            jwtConfig.secret)
            res.status(200).json({ token : token });
        }else{
            res.status(400).json({ error : "Senha Incorreta!" });
        }
    }else{
        res.status(404).json({ error : "Usuário não cadastrado!" });
    }
})




