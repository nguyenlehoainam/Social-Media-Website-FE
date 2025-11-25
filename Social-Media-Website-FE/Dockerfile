# Stage 1: Build app
FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

# Stage 2: Serve với nginx
FROM nginx:alpine

# Copy build ra thư mục public của nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy config nginx để xử lý SPA routing (dùng index.html cho mọi route)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

