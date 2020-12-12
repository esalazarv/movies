FROM node:lts-alpine as base
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
WORKDIR /var/www/html
COPY ./package*.json ./
RUN pip3 install --no-cache --upgrade pip setuptools && npm install
COPY . ./


# For development stage
FROM base as development
ENV APP_PORT=80
EXPOSE $APP_PORT
ENTRYPOINT npm run serve -- --port $APP_PORT --public


# For build stage
FROM base as build
RUN npm install -g @vue/cli
RUN npm run build -- --no-fix-warnings
ENTRYPOINT ["tail", "-f", "/dev/null"]


# For production stage
FROM nginx:alpine as production
ENV APP_PORT=80
WORKDIR /usr/share/nginx/html
COPY --from=build /var/www/html/dist /usr/share/nginx/html
EXPOSE $APP_PORT
CMD ["nginx", "-g", "daemon off;"]
