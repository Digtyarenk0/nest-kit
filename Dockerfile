FROM node:22.3.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN chmod +x entrypoint.sh

ENTRYPOINT ["/bin/bash", "entrypoint.sh"]