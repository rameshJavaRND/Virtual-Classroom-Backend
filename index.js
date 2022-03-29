const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const subjectRoutes = require("./routes/subjectRoutes");
const branchRoutes = require("./routes/branchRoutes");
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
app.use("/subject", subjectRoutes);
app.use("/branch", branchRoutes);
// app.use("/", web);

app.listen(PORT, () => {
  console.log(`Vitual Classroom Server started`);
});
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
      status: err.status,
      massage: err.massage
  })
})
