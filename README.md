# Cadastro de Usuários

Este projeto é uma aplicação de cadastro de usuários com front-end em React e back-end em Node.js, utilizando MongoDB como banco de dados.

---

## 🔍 Tecnologias usadas
- React + Vite
- Node.js + Express
- Prisma
- MongoDB
- Axios
- MUI

---

## 🔧 Como rodar o projeto

### Pré-requisitos

- Node.js (v18+)
- npm
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### 📦 1. Clone o repositório

```bash
git clone https://github.com/amandaprampero/cadastro-usuarios.git
cd cadastro
```

---

### ⚙️ 2. Configure o banco de dados

Crie uma conta ou entre no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

1. Crie um cluster gratuito
2. Crie um banco chamado `Users`
3. Crie um usuário com nome e senha
4. Vá em "Connect > Drivers > Node.js" e copie a URI gerada
5. Crie um arquivo `.env` dentro da pasta `backend/api/` com:

`DATABASE_URL="mongodb+srv://<usuario>:<senha>@<seu-cluster>.mongodb.net/Users?retryWrites=true&w=majority"`

---

### 📁 3. Instale as dependências 

#### Back-end

```bash
cd backend/api
npm install
npx prisma generate
node server.js
```

#### Front-end

```bash
cd ../frontend/cadastro-usuarios
npm install
npm run dev
```
