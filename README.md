# Steps to deploy webpage into Docker

(Supposing html, css and js for website are already done)

## Install Application Dependencies

Create package.json and run `npm intall`

```json
{
  "name": "nodejs-image-demo",
  "version": "1.0.0",
  "description": "nodejs image demo",
  "author": "Diana Prince <diana@justiceleague.com>",
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
var express = require("express");
var app = express();
var router = express.Router();

var path = __dirname + "/views/";

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.use(express.static(path));
app.use("/", router);

app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
```

Now run `npm start`

Your page should show in `localhost:8080`.
To quit the server, type Ctrl+C on your terminal.

# Writing the Dockerfile

Crete a file called Dockerfile and paste:

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

`docker build -t manu/reposlist .`

The . specifies that the build context is the current directory.

Check your images:

`docker images`

Run the following command to build a container using this image:

`docker run --name reposlis -p 80:8080 -d manu/reposlist` 
```

Inspect the list of your running containers with docker ps:

```docker ps```

It should be running on localhost. To stop it, run

```docker stop 64dc71```



-------------------------------------------------------------------------------

Useful:
If stopped containers don't allow you to remove images:
`docker rm $(docker ps -q -a)`

Remove images:
`docker image rm <image_id>`
