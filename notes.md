# Steps to deploy webpage into Docker

### Courtesy

I had no time to create a webpage that interacts with an API, so I got the code from [this repo](https://github.com/thinkful-ei-firefly/fetch-demo-github-api) as basis. Haven't had time to customise yet and may never have.

## Install Application Dependencies

Create package.json and run `npm intall`

```json
{
  "name": "nodejs-image-demo",
  "version": "1.0.0",
  "description": "nodejs image demo",
  "author": "Manu <manu@justiceleague.com>",
  "license": "MIT",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["nodejs", "express"],
  "dependencies": {
    "express": "^4.16.4"
  }
}
```

## Create the Application Files

Create your `app.js` files to define the routes. The code below creates Express app and router objects. It also defines base directory, port and host as variables, set the routes and mount the `router` middleware along with the statics assets.

```js
const express = require("express");
const app = express();
const router = express.Router();

const path = __dirname + "/views/";

const PORT = 8080;
const HOST = "0.0.0.0";

router.use((req, res, next) => {
  console.log("/" + req.method);
  next();
});

router.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

app.use(express.static(path));
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
```

Now run `npm start`

Your page should show in `localhost:8080`.
To quit the server, type Ctrl+C on your terminal.

# Writing the Dockerfile

Crete a file called Dockerfile and paste:

[Dockerfile cheat 1](https://kapeli.com/cheat_sheets/Dockerfile.docset/Contents/Resources/Documents/index)
[Dockerfile cheat 2](https://developer.okta.com/blog/2017/08/28/developers-guide-to-docker-part-2)

```Dockerfile
FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]
```

Next, add modules, npm logs, Dockerfile and .dockerignore to .dockerignore file:

```
node_modules
npm-debug.log
Dockerfile
.dockerignore
```

Build the application image using the docker build command:  
_it won't accept capital letters_

`docker build -t manu/repos-list .`

The . specifies that the build context is the current directory.

Check your images:

`docker images`

Run the following command to build a container using this image:

`docker run --name repos-list -p 80:8080 -d manu/repos-list`

Inspect the list of running containers with docker ps:

`docker ps`

It should be running on localhost. To stop it, run

`docker stop 64dc71` (or whatever is the ID)

---

Useful:
If stopped containers don't allow you to remove images:
`docker rm $(docker ps -q -a)`

Remove images:
`docker image rm <image_id>`

List containers:
`docker container ls -a`

Stop container:
`docker container stop [container_id]`

Remove container:
`docker container rm [container_id]`

Remove all containers:
`docker container stop $(docker container ls –aq) && docker system prune –af ––volumes`
