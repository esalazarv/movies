FROM node:lts-alpine as base
WORKDIR /var/www/html
COPY ./package*.json ./
RUN npm install
COPY . ./


# For development stage
FROM base as development
ENV APP_PORT=80
#RUN npm install -g @vue/cli
EXPOSE $APP_PORT
ENTRYPOINT npm run serve -- --port $APP_PORT --public


# For build stage
FROM base as build
RUN npm run build


# For production stage
FROM nginx:alpine as production
ENV APP_PORT=80
WORKDIR /usr/share/nginx/html
COPY --from=build /var/www/html/dist /usr/share/nginx/html
EXPOSE $APP_PORT
CMD ["nginx", "-g", "daemon off;"]
