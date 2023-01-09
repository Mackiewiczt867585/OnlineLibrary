FROM node:18.12.1
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install && \
    npm install react-scripts@5.0.0 -g && \
    npm install javascript-time-ago && \
    npm install react-time-ago && \
    npm install react-paginate
COPY . .
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache
EXPOSE 3000
CMD npm start