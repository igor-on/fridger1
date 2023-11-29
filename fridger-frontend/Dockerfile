FROM node:latest as builder


WORKDIR /app-ui

COPY . /app-ui/
RUN npm install && npm run build


FROM nginx:latest

COPY --from=builder /app-ui/dist/fridger-frontend /usr/share/nginx/html
COPY --from=builder  /app-ui/nginx.conf /etc/nginx/conf.d/default.conf