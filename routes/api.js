const express = require("express");
const router = express.Router();
const authJWT = require("../middlewares/authJWT");
const { check, validationResult } = require("express-validator");

// Controllers list
const studentController = require("../controllers/studentController");
const questionController = require("../controllers/questionController");
const answerController = require("../controllers/answerController");
const adminController = require("../controllers/adminController");
const facultyController = require("../controllers/facultyController");
const branchController = require("../controllers/branchController");
const subjectController = require("../controllers/subjectController");

// Admin Routes
router.post("/adminLogin", adminController.login);
router.get("/adminquestion", authJWT.verifyToken, adminController.list);
router.delete(
  "/deletequestion/:id",
  [authJWT.verifyToken],
  adminController.destroy
);
router.put("/editquestion/:id", [authJWT.verifyToken], adminController.update);

// Student Login and Register routes
router.post("/login", studentController.login);
router.post("/register", studentController.register);
router.get("/student", [authJWT.verifyToken], studentController.list);

// Question and Answer routes
router.post("/question", authJWT.verifyToken, questionController.create);
router.get("/question", authJWT.verifyToken, questionController.list);
router.post("/answer", authJWT.verifyToken, answerController.create);
router.get("/answer", authJWT.verifyToken, answerController.list);

// Faculty Login and Register routes

router.get("/allfaculty", facultyController.allfaculty);
router.post(
  "/fregister",
  [
    check("username")
      .notEmpty()
      .withMessage("Username is required")
      .trim()
      .isAlphanumeric()
      .withMessage("Username should be alphanumeric"),
    check("password")
      .notEmpty()
      .withMessage("Password is required.")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long"),
    check("name").notEmpty().withMessage("Name is required.").trim(),
    check("phone_no")
      .notEmpty()
      .withMessage("Phone Number is Required.")
      .trim()
      .isLength({ min: 10, max: 10 })
      .withMessage("Please enter a 10 digit phone number."),
    check("subject").notEmpty().withMessage("Subject is required.").trim(),
    check("branch").notEmpty().withMessage("Branch is required.").trim(),
  ],
  facultyController.registerUser
);
router.post(
  "/flogin",
  [
    check("username")
      .notEmpty()
      .withMessage("Username is required")
      .trim()
      .isAlphanumeric()
      .withMessage("Username should be alphanumeric"),
    check("password")
      .notEmpty()
      .withMessage("Password is required.")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 character long"),
  ],
  facultyController.loginUser
);

//Subject upload, edit and get all routes
router.post("/subjectUpload", subjectController.subjectUpload);
router.get("/allSubjects", subjectController.fetchAllSubjects)
router.put("/editSubject/:id", subjectController.editSubject)

//Branch upload, edit and get all routes
router.post("/addBranch", branchController.addBranch);
router.get("/getAllBranches", branchController.getAllBranches);
router.put("/editBranch/:id", branchController.editBranch);


module.exports = router;
