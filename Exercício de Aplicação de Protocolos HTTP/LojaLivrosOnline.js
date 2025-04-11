import tabelaLoja from './tabelaLoja.js';
import express from 'express';

const app = express();
app.use(express.json()); 


app.get('/', (req, res) => {
    res.status(200).json(tabelaLoja);
});


app.get('/', (req, res) => {
    const IdInformada = parseInt(req.params.idd); 
    const livro = tabelaLoja.find((infoLivro) => infoLivro.id === IdInformada); 

    if (!livro) {
        return res.status(404).json({ mensagem: 'Livro não encontrado!' });
    }

    res.status(200).json(livro);
});


app.get('/:id', (req, res) => {
    const IdInformada = parseInt(req.params.id); 
    const livroSelecionado = tabelaLoja.find((l) => l.id === IdInformada);

    if (!livroSelecionado) {
        return res.status(404).json({ mensagem: 'Livro não encontrado!' });
    }

    const campos = Object.keys(req.body);
    for (let campo of campos) {
        livroSelecionado[campo] = req.body[campo];
    }

    res.status(200).json(livroSelecionado);
});

app.listen(300, () => console.log('Servidor rodando com sucesso na porta 300!'));
