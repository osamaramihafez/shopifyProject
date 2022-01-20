const express = require("express");
const bodyParser = require("body-parser");
const inventory = require("./routes/inventory");
const cors = require("cors");

var port = 3001;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "*");
  console.log(`\nEndpoint Hit: ${req.originalUrl}\n`);
  next();
});

app.use("/api", inventory);

if (process.env.NODE_ENV == "development") {
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
}
