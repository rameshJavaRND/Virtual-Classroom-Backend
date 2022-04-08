const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const subjectModel = require("../models/Subject");

/**
 * @Author Bishal
 * @Controller Subject add, edit and listall Controller
 */

const addSubject = async (req, res) => {
  try {
    const subjectCodeAlreadyExist = await subjectModel.findOne({
      subjectCode: req.body.subjectCode,
    });

    if (subjectCodeAlreadyExist) {
      return res.json({ message: "Subject code already exists!!" });
    }

    let subjectData = {
      subjectCode: req.body.subjectCode,
      subjectName: req.body.subjectName,
    };
    const sdata = await subjectModel.create(subjectData);
    return res.json({
      sdata,
    });
  } catch (error) {
    return res.status(406).send({
      message: "Unable To Add Subject!",
    });
  }
};

const allSubjects = async (req, res) => {
  const listsubject = await subjectModel.find({});
  if (listsubject !== null) {
    return res.json({
      listsubject: listsubject,
    });
  } else {
    return res.json({
      message: "No subject to display!!",
    });
  }
};

const editSubject = async (req, res) => {
  const id = req.params.id;

  try {
    await subjectModel.findByIdAndUpdate(id, req.body);
    res.json({
      message: "Subject updated successfully!",
    });
  } catch {
    res.status(500).json({
      message: "Could not Edit Subject with id = " + id,
    });
  }
};

module.exports = {
  addSubject,
  allSubjects,
  editSubject,
};
