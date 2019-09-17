FROM node:8.15.1-alpine
RUN npm install -g npm@latest && npm install -g @vue/cli && mkdir /www
WORKDIR /www
CMD ["sh"]