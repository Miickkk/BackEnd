const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./DataBase/database1");
const Pergunta = require("./DataBase/Dados");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com DB feita com sucesso!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:dados", (req, res) => {
  res.render("dados");
});

app.post("/salvarpergunta", (req, res) => {
  var nome = req.body.nome;
  var endereco = req.body.endereco;
  var telefone = req.body.telefone;

  Pergunta.create({
    nome: nome,
    endereco: endereco,
    telefone: telefone,
  }).then(() => {
    res.redirect("/");
  });
});

app.listen(4001, () => {
  console.log("App rodando!");
});
