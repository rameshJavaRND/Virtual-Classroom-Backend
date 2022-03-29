const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

// Upload a subject
router.post("/subjectUpload", subjectController.subjectUpload);
// get all subjects
router.get("/allSubjects", subjectController.fetchAllSubjects)
// edit subject
router.put("/editSubject/:id", subjectController.editSubject)

module.exports = router;
