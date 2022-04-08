const userModel = require("../models/Faculty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

/**
 * @Author Bishal
 * @Controller Faculty Register, Login and allfaculty Controller
 */

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors });
    }

    const userAlreadyExist = await userModel.findOne({
      username: req.body.username,
    });

    if (userAlreadyExist) {
      return res.json({ message: "Username already exists!!" });
    }

    const userData = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      phone_no: req.body.phone_no,
      subject: req.body.subject,
      branch: req.body.branch,
    };

    await userModel.create(userData);

    return res.json({
      message: "User registration success",
      status: 200,
    });
  } catch (err) {
    return res.json({
      message: "Something went wrong!!",
      status: 500,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors });
    }

    const userExist = await userModel.findOne({ username: req.body.username });
    if (!userExist) {
      return res.json({ message: "User does not exists!!" });
    }

    const userPassHashFromDB = userExist.password;
    const passCorrect = await bcrypt.compare(
      req.body.password,
      userPassHashFromDB
    );
    if (!passCorrect) {
      return res.json({ message: "Wrong Password!!" });
    }

    const token = jwt.sign(
      {
        _id: userExist._id,
        username: userExist.username,
        name: userExist.name,
        phone_no: userExist.phone_no,
        subject: userExist.subject,
        branch: userExist.branch,
      },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    return res.json({ message: "Login succesfull!", token });
  } catch (err) {
    return res.json({
      message: "Something went wrong!!",
      status: 500,
    });
  }
};

const studentallfaculty = async (req, res) => {
  const listfaculty = await userModel.find({});
  if (listfaculty !== null) {
    return res.json({
      listfaculty: listfaculty,
    });
  } else {
    return res.json({
      message: "No faculty to display!!",
    });
  }
};

const adminallfaculty = async (req, res) => {
  const listfaculty = await userModel.find({});
  if (listfaculty !== null) {
    return res.json({
      listfaculty: listfaculty,
    });
  } else {
    return res.json({
      message: "No faculty to display!!",
    });
  }
};


/**
 * @Author Lavi
 * @Controller Faculty Update and getProfile Controller
 */

const updateProfile = async (req, res) => {
  const id = req.params.id;

  try {
    await userModel.findByIdAndUpdate(id, req.body);
    res.json({
      message: "Profile updated successfully!",
    });
  } catch {
    res.status(500).json({
      message: "Could not Edit Profile with id = " + id,
    });
  }
};

const getProfile = async (req, res) => {
  const id = req.params.id;
  try{
  const facultyProfile = await userModel.findById(id);
  return res.json({
    facultyProfile,
  });
}catch{
  res.status(500).json({
      message: "Could not find Profile with id = " + id,
    });
}
};



module.exports = {
  registerUser,
  loginUser,
  studentallfaculty,
  adminallfaculty,
  updateProfile,
  getProfile,
};
