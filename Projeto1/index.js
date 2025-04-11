const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database")
const Pergunta =  require("./database/Pergunta");

connection
     .authenticate()
     .then(() => {
        console.log("Conexão com DB feita com sucesso!")
     })
     .catch((msgErro) => {
        console.log(msgErro);
     });

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req, res) => {    
    res.render("index");
});

app.get("/:pergunta",(req, res) => {    
    res.render("pergunta");
});

app.post("/salvarpergunta",(req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao,
    }).then(() => {
        res.redirect("/")
    });
});

app.listen(4000,()=>{console.log("App rodando!");});