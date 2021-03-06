# base image (all dockerfiles should have this)
FROM node:12.14
 
# set working directory
WORKDIR /app
 
### install and cache app dependencies
 
# copy package.json & package-lock.json to ./ inside the Docker image
COPY package*.json ./
 
# install dependencies of the app
RUN npm install
 
# install dependencies for start.sh
# RUN apt-get update
 
# copy the source code to the Docker image
COPY . .
 
# expose the port where the app will listen to
EXPOSE 4200 49153
 
# start the server
CMD ["ng", "serve", "--open"]