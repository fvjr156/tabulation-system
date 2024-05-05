const express = require("express");
const cors = require("cors");
const dotenvconfig = require('./configs/server/dotenvconfig')
const bodyParser = require("body-parser");
const router = require("./routes/routes");
const {
  TestConnection,
  SyncDatabase,
} = require("./controller/db/db_operations");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("model/static"));
app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

TestConnection();
//SyncDatabase()

app.listen(dotenvconfig.serverPort, function () {
  console.log(`Server is running on port ${process.env.SERVER_PORT}.`);
});
