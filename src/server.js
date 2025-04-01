import express from 'express'
import crypto from 'crypto'

const app=express();

//Ex1
app.get('/',(req,res)=>{
    res.send("OLA! o/");
})

//Ex2
app.get('/:nome',(req,res)=>{
    const {nome}=req.params
    res.send("Olá, "+nome)
})

//Ex3
const middleware=(req,res,next)=>{
    if(req.headers.authorization == "123"){
        next()
    }else{
        res.send('Não autorizado')
    }
}

app.get('/validacao/isAuth',middleware, (req, res)=>{
    res.send('Tudo certo')
})

//Ex4

let lista=[
    {id: 1, nome: "Monitor"},
    {id: 2, nome: "Mouse"},
    {id: 3, nome: "Caneca"}
]

app.get('/busca/lista', (req, res) => {
    const busca = req.query.busca;
    const resultados = lista.filter(item => {
        if (item && item.nome && typeof item.nome === 'string') {
            return item.nome.toLowerCase().includes(busca.toLowerCase());
        }
        return false;
    });

    res.json(resultados);
});

//Ex5
app.post('/lista/produtos',(req,res)=>{
    const produto = req.body;
    const id = crypto.randomUUID();
    lista.push(produto);
    res.status(201).json(produto);
})

//Ex6
app.use(express.json());

const middlewareName=(req,res,next)=>{
    const nome=req.body.nome;
    const nomeRegex=/^[A-Z][a-z]+$/;
    if(nomeRegex.test(nome)){
        next();
    }else{
        res.send("Nome invalido");
    }
}

const middlewareEmail=(req,res,next)=>{
    const email=req.body.email;
    const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(emailRegex.test(email)){
        next();
    }else{
        res.send("Email invalido");
    }
}

app.post('/usuarios',middlewareName,middlewareEmail,(req,res)=>{
    const usuarios=req.body;
    res.status(201).json(usuarios)
})

//Ex7
app.get('/errors/erro', (req, res, next) => {
    const erro = new Error("Algo deu errado!");
    erro.status = 500;
    next(erro);
});

app.use((err, req, res, next) => {
    console.error(err);
    const statusCode = err.status || 500;
    const message = err.message || 'Algo deu errado no servidor!';
    res.status(statusCode).json({
        error: {
            message: message,
            statusCode: statusCode
        }
    });
});

app.listen(3000, (err) => {
    if (err) {
        console.log('Erro ao iniciar o serviço!');
        return;
    }
    console.log("Service iniciado na porta 3000");
});