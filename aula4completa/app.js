import tabela2024 from './tabela.js';
import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (requisicao, resposta) => {
  resposta.status(200).send(tabela2024);
});

app.get('/:sigla', (requisicao, resposta) => {
  const siglaInformada = requisicao.params.sigla.toUpperCase();
  const time = tabela2024.find((infoTime) => infoTime.sigla === siglaInformada);
  if (!time /*time === undefined*/) {
    //undefined -> se comporta como falso toda vez que exigimos comportamento
    //de boolean. -> se a variável time for "undefined", então ela vai se comportar como
    //false -> Consequentemente, !time vai se comportar como verdadeiro.
    resposta
      .status(404)
      .send(
        'Não existe na série A do Brasileirão um time com a sigla informada!'
      );
    return;
  }
  resposta.status(200).send(time);
});

app.put('/:sigla', (req, res) => {
  const siglaInformada = req.params.sigla.toUpperCase();
  const timeSelecionado = tabela2024.find((t) => t.sigla === siglaInformada);
  const campos = Object.keys(req.body);
  for (let campo of campos) {
    timeSelecionado[campo] = req.body[campo];
  }
  res.status(200).send(timeSelecionado);
});

app.listen(300, () => console.log('servidor rodando com sucesso'));
