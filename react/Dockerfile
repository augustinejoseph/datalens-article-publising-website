FROM node:alpine
COPY package*.json ./
RUN npm i
COPY /dist ./dist
EXPOSE 3000
CMD ["npm", "run", "preview"]

