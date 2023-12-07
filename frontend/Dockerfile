# Use an official Node runtime as a parent image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package*.json yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Build the React app
RUN yarn build

# Expose the port that your app will run on
EXPOSE 3000

# Define the command to run your app
CMD ["yarn", "start"]

