FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

ENV REACT_APP_KAKAO_API_KEY=d573e4a7b2fcae0f0289d5807605d726
ENV REACT_APP_API_URL=http://localhost:8080

RUN npm ci
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "build"]

