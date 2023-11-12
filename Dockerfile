FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

ENV REACT_APP_KAKAO_API_KEY=d92567d27c897634df0c647a27b70e3c

RUN npm ci
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]

