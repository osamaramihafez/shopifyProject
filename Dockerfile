FROM node:12.19.0

ENV POSTGRES_USER=shopifyAdmin
ENV POSTGRES_PASSWORD=safePassword123!
ENV POSTGRES_HOST=docker_postgres
ENV POSTGRES_PORT=5433
ENV POSTGRES_DB=logistics

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "index.js"]