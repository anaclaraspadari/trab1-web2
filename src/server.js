import express from 'express'

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



app.listen(3000, (err) => {
    if (err) {
        console.log('Erro ao iniciar o serviço!');
        return;
    }
    console.log("Service iniciado na porta 3000");
});