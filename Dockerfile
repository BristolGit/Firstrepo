# Step 1: Build the Client
FROM node:14 as client-build
WORKDIR /client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build




# Step 2: Build the Server
FROM node:14 as server-build
WORKDIR /server
COPY server/package*.json ./
RUN npm install
COPY server/ ./





# Step 3: Setup Nginx to serve the Client build and run the Server
FROM nginx:alpine as production
WORKDIR /app



# Copy the server files from the server-build stage
COPY --from=server-build /server /app/server

# Copy the built client files from client-build stage
COPY --from=client-build /client/build /usr/share/nginx/html

# Copy the nginx config from the client folder
COPY /client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the necessary ports
EXPOSE 80  
EXPOSE 5000  

# Start the Server and Nginx
CMD ["sh", "-c", "node /app/server/server.js & nginx -g 'daemon off;'"]
