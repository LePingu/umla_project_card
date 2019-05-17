FROM node:10-alpine

# modules permissions and directories creation
RUN mkdir -p /umla/app/back/node_modules && chown -R node:node /umla/app/back

# Create app directory
WORKDIR /umla/app/back

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY /package*.json ./

# specifying user
USER node

RUN npm install

# Bundle app source
COPY --chown=node:node . .

EXPOSE 1337

CMD [ "npm", "start" ]