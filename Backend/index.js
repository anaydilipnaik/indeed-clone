require("dotenv").config();

const con = require("./sqlDbConfig");
var express = require("express");
var app = express();
app.use(express.json());

const cors = require("cors");
// const corsConfig = {
//   credentials: true,
//   origin: true,
// };
// app.use(cors());
app.use(cors());

const apiRouter = require("./routes/routes");
app.use("/", apiRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
