# Usa imagem oficial do Node
FROM node:20

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos essenciais primeiro (melhor para cache)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos da API
COPY . .

# Expõe a porta da aplicação (por padrão usamos 3000)
EXPOSE 3000

# Comando para rodar a API
CMD ["node", "src/server.js"]
