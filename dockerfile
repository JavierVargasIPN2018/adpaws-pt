# Imagen base de Node
FROM node:20

# Directorio de trabajo
WORKDIR /app

# Copia archivos
COPY package*.json ./
COPY prisma ./prisma
COPY tsconfig*.json ./
COPY src ./src

# Instala dependencias
RUN npm install

# Genera el cliente de Prisma
RUN npx prisma generate

# Compila TypeScript
RUN npm run build

# Expone el puerto
EXPOSE 3000

# Comando de arranque
CMD ["node", "dist/main"]
