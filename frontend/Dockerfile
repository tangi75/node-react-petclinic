FROM node:14-alpine

# Set the working directory.
WORKDIR /usr/src/app

# Copy the project from your host to your current location.
ADD . /usr/src/app/
RUN rm -rf node_modules /usr/src/app/package-lock.json || true

# Run the command inside your image filesystem.
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Run the specified command within the container.
CMD [ "npm", "start" ]
