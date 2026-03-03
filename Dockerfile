FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN addgroup -g 1001 -S vueuser && \
    adduser -S vueuser -u 1001

RUN chown -R vueuser:vueuser /app
USER vueuser

EXPOSE 5173 

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]