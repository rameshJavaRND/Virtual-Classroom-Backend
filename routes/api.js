const express = require("express");
const router = express.Router();
const authJWT = require("../middlewares/authJWT");

const studentController = require("../controllers/studentController");
const questionController = require("../controllers/questionController");

// Login and Register routes

router.post("/login", studentController.login);
router.post("/register", studentController.register);
router.post("/question", authJWT.verifyToken, questionController.create);

// router.post("/login/student", studentController.login);

module.exports = router;
