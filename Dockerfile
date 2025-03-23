FROM node:18-bookworm 

ENV CI=true

# Build app
RUN yarn install && yarn run build

EXPOSE 5001
CMD [ "yarn", "run", "start:prod"]
