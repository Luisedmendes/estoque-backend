# apps/frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe porta 3000
EXPOSE 3000

# Start em dev
CMD ["npm", "run", "dev"]
