<p align="center">
  <img src="https://i.imgur.com/whb1Ml0.png" width="400" />
</p>

<br />
<br />

<p align="center">
Um website responsivo para você explorar o universo dos repositórios do Github, desenvolvido em <b>React + TypeScript</b> 🚀️
</p>

<br />
<br />

### Instalação

Este projeto utilizou o boilerplate [create-react-app](https://github.com/facebook/create-react-app) com o template de TypeScript. O boilerplate já disponibiliza scripts para build.

- Primeiro, instale as dependências necessárias rodando `yarn` ou `yarn install`
- Com as dependências instaladas, execute `yarn start` que abrirá o projeto na build de desenvolvimento
- Para a versão de produção, execute `yarn build` na pasta do projeto.

Feito isso, você estará pronto para decolar! 🚀️

### Limitações

Para esta viagem, utilizamos a [API v3](https://developer.github.com/v3/) do Github que possui algumas limitações no número de requisições por minuto. Sem autenticação, você tem direito a 10 requisições por minuto. Se configurar seu token pessoal no arquivo **src/services/api.ts**, você poderá fazer até 30 requisições por minuto. Tome cuidado e lembre-se de **NUNCA** publicar o token em algum repositório público.

<p align="center">
<img src="https://media.giphy.com/media/MCpiclJAFrhR383Mxe/giphy.gif" width="1011" height="565" />
</p>

### Features

No Github voyager, você pode escolher uma linguagem a partir de uma infinidade de opções utilizando o autocomplete. Assim que selecionada, será exibida uma lista de repositórios encontrados.
