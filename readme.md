# Estoque Monorepo

Monorepo para gerenciamento de estoque com **backend em Node.js/TypeScript** e **frontend em Next.js**, orquestrado com **Docker** e **Docker Compose**.

---

## 📁 Estrutura do Projeto

```
estoque-monorepo/
│
├─ apps/
│  ├─ backend/      # API Node.js + TypeScript
│  └─ frontend/     # Frontend Next.js
│
├─ docker/
│  ├─ Dockerfile.backend
│  └─ Dockerfile.frontend
│
├─ docker-compose.yml
└─ README.md
```

---

## ⚙️ Pré-requisitos

* Docker >= 24
* Docker Compose >= 2
* Node.js >= 20 (para desenvolvimento local opcional)

---

## 📝 Configuração de Variáveis de Ambiente

Cada app possui seu arquivo `.env.docker`:

### Backend (`apps/backend/.env.docker`)

```env
PORT=3333
NODE_ENV=development

# MySQL
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=123456
MYSQL_DATABASE=database
MYSQL_ROOT_PASSWORD=123456

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=12345
REDIS_PREFIX=api

# JWT
JWT_LIFETIME=1d
CRYPTO_SECRET_KEY=
HASH_SECRET_KEY=10
```

### Frontend (`apps/frontend/.env.docker`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

> ⚠️ Para desenvolvimento via Docker, `localhost` do frontend container aponta para **o host**, então `NEXT_PUBLIC_API_URL=http://localhost:3333` funciona.

---

## 🐳 Comandos Docker

### 1️⃣ Build e Start de todos os serviços

```bash
docker compose up --build
```

### 2️⃣ Apenas rodar os containers sem rebuild

```bash
docker compose up
```

### 3️⃣ Derrubar containers e remover volumes do Redis/Backend

```bash
docker compose down
```

> ⚠️ Não remove o volume do MySQL (`mysql_data`) se quiser preservar os dados.

---

## 🔧 Observações importantes

* Backend dentro do Docker deve usar `MYSQL_HOST=mysql` e `REDIS_HOST=redis`.
* Drivers MySQL e Redis **devem ter SSL desabilitado** para desenvolvimento:

```ts
// TypeORM / mysql2
ssl: false

// ioredis / Bull
tls: undefined
```

* Para acessar o frontend no navegador: [http://localhost:3000](http://localhost:3000)
* Para acessar a API do backend no host: [http://localhost:3333](http://localhost:3333)

---

## ⚡ Desenvolvimento

### Rodando backend em modo dev (hot reload)

```bash
docker compose run --service-ports backend npm run dev
```

### Rodando frontend em modo dev (hot reload)

```bash
docker compose run --service-ports frontend npm run dev
```

> Dessa forma, as alterações no código refletem imediatamente sem rebuild de containers.

---

## ✅ Problemas comuns

1. **EPROTO / SSL**

   * Ocorre quando o backend tenta conectar no MySQL/Redis com SSL.
   * Solução: desativar SSL nos drivers e usar `MYSQL_HOST=mysql` e `REDIS_HOST=redis`.

2. **CORS / fetch server-side**

   * Dentro do container, `localhost` não aponta para outros containers.
   * Use `host.docker.internal` no `.env.docker` se necessário.

3. **Porta já em uso / conflito de container**

   * Remover container antigo:

     ```bash
     docker rm -f <nome_do_container>
     ```

---

## 📌 Links úteis

* [Docker Compose networking](https://docs.docker.com/compose/networking/)
* [Next.js environment variables](https://nextjs.org/docs/basic-features/environment-variables)
* [TypeORM MySQL SSL options](https://typeorm.io/data-source-options#mysqlmysql2)

---

> Pronto para desenvolvimento e teste local com Docker! 🚀
