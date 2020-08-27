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
  console.log(`Example app listening on port ${8080}!`);
});
