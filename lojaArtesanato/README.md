#Relatório do Projeto

    ETAPAS REALIZADAS:

        -Configuração do Ambiente;
        -Modelagem do Banco de Dados;
        -Criação das Rotas;
        -Implementação dos Controllers;
        -Criação das Views (Templates);
        -Utilização do Body-parser;
        -Testes;

    PROBLEMAS ENFRENTADOS:

        1- Problema: O código antes do forEach não era reconhecido.

            Solução: Verificamos se a variável cadastro estava corretamente definida e populada antes de ser utilizada no forEach.
            Garantimos que a estrutura de inclusão dos arquivos parciais (partials/header.ejs, partials/navbar.ejs, partials/footer.ejs) estivesse correta e sem erros de sintaxe.

            Testamos a renderização da página sem o loop para verificar se o erro estava relacionado ao forEach ou a outro trecho do código.

        2- Problema: Rota "/salvarcadastro" retorna página não encontrada
            O erro acontecia porque a rota /salvarcadastro não era encontrada, possivelmente devido ao método HTTP errado no formulário.
            A solução foi garantir que a rota no index.js estivesse definida corretamente como app.post("/salvarcadastro", ...) e que o formulário no cadastrar.ejs usasse method="POST".

        3- Dúvida: O que é "upload.single" e "multer"?
        multer é um middleware para upload de arquivos. upload.single("imagem") é usado quando o usuário precisa enviar um arquivo, mas no caso do projeto, a imagem é um link digitado.
            A solução foi remover upload.single("imagem") do código, pois não era necessário.

        4- Problema: Erro ao salvar dados no banco
        O erro acontecia porque a imagem estava sendo salva de forma errada, e o banco podia estar esperando um BLOB em vez de STRING.
            A solução foi garantir que o campo imagem no banco fosse VARCHAR(255) e não BLOB, ajustando o modelo Cadastro.js e, se necessário, alterando a tabela no MySQL.

        5- Problema: No index, aparece o link da imagem em vez da própria imagem
        O código estava exibindo apenas o link da imagem como texto.
            A solução foi usar a tag <img> para exibir a imagem corretamente: <img src="<%= p.imagem %>" alt="Imagem do produto" width="200">.

        6- Problema: Erro ao tentar acessar um produto separado na página
        O erro "produto.forEach is not a function" indicava que produto não era um array, mas sim um objeto único.
            A solução foi modificar a rota para buscar um único produto no banco e ajustar a exibição no produto.ejs, removendo o forEach e acessando os dados diretamente.

        7- Dúvida: Como garantir que a imagem apareça corretamente ao cadastrar um link?
            A solução foi garantir que o input de imagem no formulário aceitasse um link e que as páginas exibissem a imagem com <img>.




