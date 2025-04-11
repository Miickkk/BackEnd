const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Cadastro = require("./database/Cadastro");

//Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão bom BD feita com sucesso!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res)=> {
    Cadastro.findAll({raw: true, order:[
        ["id", 'DESC']
    ] }).then(cadastro => {
        res.render("index", { cadastro: cadastro});
    });
});

app.get("/cadastrar",(req, res) => {
    res.render("cadastrar");
});

app.post("/salvarcadastro",(req, res) => {
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var imagem = req.body.imagem; // Certifique-se de que isso é um link

    Cadastro.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        imagem: imagem
    }).then(() => {
        res.redirect("/");
    }).catch((erro) => {
        console.log("Erro ao salvar no banco:", erro);
        res.redirect("/cadastrar");
    });
});

app.get("/produto/:id",(req, res) => {
    var id = req.params.id;
    Cadastro.findOne({
        where : {id : id}
    }).then(produto => {
        if(produto){
           res.render("produto", { produto: produto });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        console.log("Erro ao buscar produto:", err);
        res.redirect("/");
    });
});

app.listen(4000,()=>{console.log("App rodando!");});