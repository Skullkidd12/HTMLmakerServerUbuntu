## EmailMaker1.0
>Esta é uma aplicação Fullstack que disponibiliza componentes para a construção de HTMLs de email responsivos usando nunjucks como pre-processador.

A ideia desse App era facilitar a construção de HTMLs de email para o time de criação da Plusoft MKT suite. O emailmaker já teve seu deploy e ja está disponível, porém ainda esta em processo de criação de componentes e implementação no fluxo de trabalho.
O frontend está hostado no netlify e o backend no render. O render free coloca a API em hibernação caso a mesma nao receba requests durante 10 minutos ( e isso deixa o tempo de resposta de ate 50sec), para combater isso eu criei uma nodecron que envia uma request GET pra sí mesma a cada 8 minutos, assim evitando a hibernação (foi a solução que eu achei kk).

O backend foi feito com **node.js** e **Nunjucks**
O frontend foi feito com **React** e **MaterialUI**
![image](https://github.com/user-attachments/assets/a6c5d032-e196-4bf5-8b22-af21466139e6)


## 🚀 Tecnologias usadas

- Vitejs
- Node.js
- MaterialUI
- React
- Express
- Nunjucks

Para acessar o app é só ir no site:
https://marvelous-dodol-99871d.netlify.app/

### ESTE É UM TRABALHO EM PROGRESSO (ainda tem bugs, e se sintam livres pra concertar coisas)


