Trabalho 1 - Programação Orientada a Eventos

Desenvolvido por: Guilherme Andersen Correa

Este projeto implementa uma aplicação de smart home com programação orientada a eventos, onde o backend se comunica com o frontend usando WebSockets (Socket.io).

Instruções de Execução do Projeto

Frontend

1. Acesse o diretório do frontend:
   Navegue até a pasta smart-home-frontend.

2. Instale as dependências necessárias:
   Execute os seguintes comandos para instalar as dependências do projeto:

   npm install socket.io-client
   npm install @types/socket.io-client --save-dev

3. Execute o projeto no navegador:
   Acesse a pasta smart-home-frontend/frontend e execute:

   npm start

   O aplicativo será iniciado e aberto automaticamente no navegador.

4. Erro comum: `react-scripts: not found`:
   Caso apareça o erro `react-scripts: not found`, execute o seguinte comando para corrigir:

   npm install react-scripts

   Após a instalação, execute novamente:

   npm start

Backend

1. Acesso ao diretório do backend:
   Após realizar o clone do projeto, a pasta node_modules pode ter sido comitada indevidamente. Caso o backend não execute corretamente, siga os passos abaixo.

2. Deletar a pasta node_modules:
   Dentro do diretório smart-home-backend, delete a pasta node_modules caso exista.

3. Instalar dependências do backend:
   Navegue até o diretório smart-home-backend e execute os seguintes comandos para instalar as dependências necessárias:

   npm install express socket.io cors typescript ts-node-dev @types/node @types/express @types/socket.io

4. Configurar o TypeScript:
   Caso o TypeScript ainda não tenha sido configurado, execute o comando abaixo para inicializar o TypeScript:

   npx tsc --init

5. Iniciar o servidor backend:
   Após a instalação das dependências e configuração do TypeScript, inicie o backend executando:

   npm start

Considerações Finais

- Certifique-se de que tanto o frontend quanto o backend estão rodando na mesma rede ou máquina, para garantir a comunicação via WebSockets.
- O frontend (React) irá se conectar ao backend (Express + Socket.io) para gerenciar dispositivos da "smart home".
- Em caso de dúvidas ou problemas, sinta-se à vontade para abrir uma issue ou contactar o desenvolvedor.
