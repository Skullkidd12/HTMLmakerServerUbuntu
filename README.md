# 🚀 Deploy do Servidor Express + Frontend React em VM Linux (Oracle Cloud)

Este guia ensina a instalar e rodar o **Servidor Express (Node.js)** e o **Frontend React** em uma VM Linux (Ubuntu) na Oracle Cloud.  
Foi testado em uma VM local com Ubuntu e funcionou corretamente ✅.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- Acesso à VM Linux (Ubuntu)
- Usuário com privilégios de `sudo`
- Conexão com a internet

---

## ⚙️ Instalação de dependências

### 1. Atualizar pacotes do sistema
```bash
sudo apt update
```

### 2. Instalar Node.js e NPM
```bash
sudo apt install nodejs npm -y
```

### 3. Instalar o Git
```bash
sudo apt install git -y
```

---

## 📥 Clonando o repositório

Crie uma pasta (opcional) e clone o projeto:

```bash
git clone https://github.com/Skullkidd12/HTMLmakerServerUbuntu.git
cd HTMLmakerServerUbuntu
```

O repositório contém duas partes:
- `server/` → Backend em Express
- `frontend/` → Frontend em React

---

## 🔧 Configuração do Servidor (Backend)

### 4. Instalar dependências
```bash
cd server
npm install
```

### 5. Rodar o servidor
```bash
node app.js
```

Se tudo deu certo, o servidor estará rodando em:  
```
http://<ip-da-sua-vm>:3000
```

---

## 🎨 Configuração do Frontend (React)

### 6. Instalar dependências
```bash
cd ../frontend
npm install
```

### 7. Gerar build de produção
```bash
npm run build
```

Isso criará a pasta **`build/`** com os arquivos prontos para produção.

---

## 🌐 Servindo o Frontend

### Opção A: Usar o pacote `serve`
```bash
sudo npm install -g serve
serve -s build -l 8080
```
Acesse em:
```
http://<ip-da-sua-vm>:8080
```

### Opção B: Integrar o React ao Express
Edite o `server/app.js` e adicione:
```js
const path = require("path");

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
```
Assim, o frontend será servido junto com o backend, ambos na **porta 3000**.

---

## 🔄 Mantendo processos rodando

Para que o servidor continue ativo após fechar o terminal, use o **PM2**:

```bash
sudo npm install -g pm2
pm2 start server/app.js --name servidor
pm2 start "serve -s frontend/build -l 8080" --name frontend
```

Ou, se integrar o React ao Express, basta rodar apenas o servidor.

---

## ✅ Conclusão

- Backend rodando em **Express (porta 3000)**  
- Frontend React rodando em **serve (porta 8080)** ou integrado ao Express  
- PM2 garante que tudo fique online mesmo após sair da VM  

🎉 Agora sua aplicação está disponível na VM da Oracle Cloud!  
