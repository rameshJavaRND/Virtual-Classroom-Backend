const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const api = require("./routes/api");
// const web = require("./routes/web");

const connectDB = require("./services/database");

const app = express();

dotenv.config({
  path: "config.env",
});

const PORT = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// Load Routers
app.use("/api", api);
// app.use("/", web);

app.listen(PORT, () => {
  console.log(`Virtual Classroom Server started`);
});
