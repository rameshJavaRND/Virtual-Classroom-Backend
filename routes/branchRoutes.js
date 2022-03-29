const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
// add new branch route
router.post("/addBranch", branchController.addBranch);
// get all branches route
router.get("/getAllBranches", branchController.getAllBranches);
// edit branch route
router.put("/editBranch/:id", branchController.editBranch);
module.exports = router;