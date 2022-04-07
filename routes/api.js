const express = require("express");
const router = express.Router();
const authJWT = require("../middlewares/authJWT");
const { check, validationResult } = require("express-validator");
const { upload } = require("../helpers/filehelper");
const {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
} = require("../controllers/fileuploaderController");

// Controllers list
const studentController = require("../controllers/studentController");
const questionController = require("../controllers/questionController");
const answerController = require("../controllers/answerController");
const adminController = require("../controllers/adminController");
const facultyController = require("../controllers/facultyController");
const branchController = require("../controllers/branchController");
const subjectController = require("../controllers/subjectController");
const fileuploaderController = require("../controllers/fileuploaderController");

// Admin Routes
router.post("/adminLogin", adminController.login);
router.get("/adminquestion", authJWT.verifyToken, adminController.list);
router.delete(
  "/deletequestion/:id",
  [authJWT.verifyToken],
  adminController.destroy
);
router.put("/editquestion/:id", authJWT.verifyToken, adminController.update);
router.get("/listprofile", authJWT.verifyToken, adminController.listprofile);


// Student Login and Register routes
router.post("/login", studentController.login);
router.post("/register", studentController.register);
router.get("/student", authJWT.verifyToken, studentController.list);
router.put("/editProfile/:id", studentController.updateProfile);
router.get("/getProfile/:id", studentController.getProfile);

// Question and Answer routes
router.post("/question", authJWT.verifyToken, questionController.create);
router.get("/question", authJWT.verifyToken, questionController.list);
router.post("/answer", authJWT.verifyToken, answerController.create);
router.get("/answer", authJWT.verifyToken, answerController.list);

// Faculty Login, Register, Listall, routes
router.get("/studentallfaculty", facultyController.studentallfaculty);
router.get("/adminallfaculty", facultyController.adminallfaculty);
router.post("/fregister", facultyController.registerUser);
router.post("/flogin", facultyController.loginUser);
router.put("/feditProfile/:id", facultyController.updateProfile);
router.get("/fgetProfile/:id", facultyController.getProfile);

//Subject upload, edit and get all routes
router.post("/addSubject", subjectController.addSubject);
router.get("/allSubjects", subjectController.allSubjects);
router.put("/editSubject/:id", subjectController.editSubject);

//Branch upload, edit and get all routes
router.post("/addBranch", branchController.addBranch);
router.get("/allBranches", branchController.allBranches);
router.put("/editBranch/:id", branchController.editBranch);

//PPT routes
router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFiles", upload.array("files"), multipleFileUpload);
router.get("/getSingleFiles", getallSingleFiles);
router.get("/getMultipleFiles", getallMultipleFiles);

module.exports = router;
