const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const api = require("./routes/api");
const connectDB = require("./services/database");
const bodyParser = require("body-parser");
const app = express();

dotenv.config({
  path: "config.env",
});

const PORT = process.env.PORT || 8080;
connectDB();

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/faculty", api);
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/api", api);
app.listen(PORT, () => {
  console.log(`Virtual Classroom Server started`);
});
