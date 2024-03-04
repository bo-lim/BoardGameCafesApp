FROM node:alpine

WORKDIR /usr/src/next

COPY . .

#RUN npm init
RUN npm install
# RUN npm init


EXPOSE 3000


#RUN yarn install
#RUN yarn build
#RUN apk update && apk upgrade && apk add --no-cache bash git openssh

#RUN npm install --save --bin-links false express

#RUN npm update
RUN npm run build

#CMD ["yarn", "start"]

CMD [ "npm" , "run" , "dev"]