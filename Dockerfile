FROM node:22.3.0

WORKDIR /app/
COPY . .

RUN chmod +x entrypoint.sh

ENV CI=true

ENTRYPOINT ["/bin/bash", "entrypoint.sh"]