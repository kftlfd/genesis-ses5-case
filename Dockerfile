FROM node:20.18

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci

COPY . /app/
RUN npm run lint && npm run build

EXPOSE 8000
RUN chmod +x launch.sh
CMD [ "./launch.sh" ]
