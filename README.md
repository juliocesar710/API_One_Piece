
# 🏴 OnePieceDex API (API_One_Piece)

Este repositório contém o **backend** da **OnePieceDex** — uma "pokedex" inspirada no mundo de *One Piece*, desenvolvida com:

- **Node.js + Express**
- **Prisma (ORM)**
- **PostgreSQL (via Docker)**

> ⚠️ Este projeto funciona em conjunto com o frontend disponível [neste repositório](https://github.com/juliocesar710/Opex)

---

## 📁 Estrutura do projeto

```

/ (root)
├── src/
│   ├── controllers/
│   ├── routes/
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   └── ...
├── Dockerfile
└── package.json

````

---

## 🚀 Como rodar localmente

### 1. Clone o repositório da API

```bash
git clone https://github.com/juliocesar710/API_One_Piece.git
cd API_One_Piece
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados com Prisma

Se estiver rodando fora do Docker, configure o `.env`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/one_piece"
```

Depois, gere o client e rode as migrações:

```bash
npx prisma generate
npx prisma migrate deploy
```

### 4. Inicie a API

```bash
npm run dev
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🐳 Rodando com Docker (recomendado)

Se preferir, você pode rodar a **API, banco de dados e frontend juntos** com o Docker Compose. Para isso:

### 1. Clone também o frontend

```bash
git clone https://github.com/juliocesar710/Opex.git
```

### 2. Certifique-se de que os diretórios estejam assim:

```
Root/
├── API_One_Piece/ ← Este repositório
├── Opex/          ← Frontend (clonado do outro repositório)
└── docker-compose.yml
```

### 3. Use o Docker Compose

```bash
docker-compose up --build
```

---

## 📌 Endpoints principais

* `GET /characters`: Lista todos os personagens
* `GET /characters/:id`: Detalhes de um personagem
* `GET /characters/search?name=nome`: Busca por nome
* `POST /characters`: Adiciona novo personagem
* `PATCH /characters/:id`: Atualiza personagem
* `DELETE /characters/:id`: Remove personagem

---

## 🔧 docker-compose.yml (caso necessário)

Aqui está o arquivo `docker-compose.yml` que orquestra API, banco e frontend:

```yaml
version: "3.8"

services:
  db:
    image: postgres:15
    restart: always
    container_name: postgres_opex
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: one_piece
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: ./API_One_Piece
    container_name: api_opex
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@db:5432/one_piece"
    volumes:
      - ./API_One_Piece:/app
    working_dir: /app
    command: sh -c "npx prisma migrate deploy && node src/server.js"

  frontend:
    build: ./Opex
    container_name: frontend_opex
    ports:
      - "5173:80"
    depends_on:
      - api

volumes:
  postgres_data:
```
