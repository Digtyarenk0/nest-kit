FROM node:18-bookworm 

ENV CI=true

RUN apt update && \
    apt install python3 gcc make build-essential ffmpeg -y

# Copying files
COPY . .

# Add input & output folders
RUN mkdir -p input output

# Build app
RUN yarn install && yarn run build

EXPOSE 5001
CMD [ "yarn", "run", "start:prod"]
