# Use an official Node runtime as a parent image
FROM node:20.10.0 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the Angular application in production mode
RUN ng build

# Use a lightweight Nginx image as a parent image
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

#copy certificates for https
# COPY fullchain.pem /usr/share/certs/fullchain.pem 
# COPY privatekey.pem /usr/share/certs/privatekey.pem 

# Copy the built Angular app from the builder stage to the nginx web root directory
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
