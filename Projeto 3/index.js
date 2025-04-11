const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/:formulario", (req, res) => {
  res.render("formulario");
});

app.listen(4001, () => {
  console.log("App rodando!");
});
