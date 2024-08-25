# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend application
RUN npm run build

# Install a lightweight web server to serve the built files
RUN npm install -g serve

# Expose the port the server will run on
EXPOSE 5000

# Command to serve the built application
CMD ["serve", "-s", "dist"]
