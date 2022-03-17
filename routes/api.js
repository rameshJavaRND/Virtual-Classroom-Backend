const express = require("express");
const router = express.Router();
const authJWT = require("../middlewares/authJWT");

const studentController = require("../controllers/studentController");
const questionController = require("../controllers/questionController");
const answerController = require("../controllers/answerController");

// Login and Register routes
router.post("/register", studentController.register);
router.post("/login", studentController.login);
router.get("/student", [authJWT.verifyToken], studentController.list);

// Question and Answer routes
router.post("/question", authJWT.verifyToken, questionController.create);
router.get("/question", authJWT.verifyToken, questionController.list);
// router.post("/answer", authJWT.verifyToken, answerController.create);

module.exports = router;
