const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const BranchModel = require("../models/Branch");

/**
 * @Author Bishal
 * @Controller Branch add, edit and listall Controller
 */

const addBranch = async (req, res) => {
  try {
    const branchCodeAlreadyExist = await BranchModel.findOne({
      branchCode: req.body.branchCode,
    });

    if (branchCodeAlreadyExist) {
      return res.json({ message: "Branch code already exists!!" });
    }

    let branchData = {
      branchCode: req.body.branchCode,
      branchName: req.body.branchName,
    };
    const bdata = await BranchModel.create(branchData);
    return res.json({
      bdata,
    });
  } catch (error) {
    return res.status(406).send({
      message: "Unable To Add Branch!",
    });
  }
};

const allBranches = async (req, res) => {
  const listbranches = await BranchModel.find({});
  if (listbranches !== null) {
    return res.json({
      listbranches: listbranches,
    });
  } else {
    return res.json({
      message: "No subject to display!!",
    });
  }
};

const editBranch = async (req, res) => {
  const id = req.params.id;

  try {
    await BranchModel.findByIdAndUpdate(id, req.body);
    res.json({
      message: "Branch updated successfully!",
    });
  } catch {
    res.status(500).json({
      message: "Could not Edit Branch with id = " + id,
    });
  }
};

module.exports = {
  addBranch,
  allBranches,
  editBranch,
};
