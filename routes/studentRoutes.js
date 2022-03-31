const express = require("express");


const facultyController = require("../controllers/studentController");
const router = express.Router();
// Login and Register routes
// router.post("/login/student", studentController.login);
router.route("/:id").patch(facultyController.updateFAcultyProfile).get(facultyController.getFAcultyProfile);
module.exports = router;
