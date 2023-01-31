FROM node:18 AS build
RUN mkdir /app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . /app/.
RUN npm run build

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html