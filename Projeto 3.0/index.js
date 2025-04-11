const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com DB concluída");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

// Estou dizendo para o Express usar o EJS como View engine
app.set("view engine", "ejs");
app.use(express.static("public"));
// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Rotas
app.get("/", (req, res) => {
  Pergunta.findAll({
    raw: true,
    order: [
      ["id", "DESC"], //ASC=Crescente || DESC=Decrescente
    ],
  }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/salvarresposta", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaID = req.body.perguntaID;
  Resposta.create({
    corpo: corpo,
    perguntaID: perguntaID,
  }).then(() => {
    res.redirect("/");
  });
});


app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id }
  }).then((pergunta) => {
    if(pergunta != undefined){
      res.render("pergunta", {
        pergunta: pergunta
    });
    } else{
      res.redirect("/");
    }
  });
});

app.listen(4000, () => {
  console.log("App rodando!");
});
