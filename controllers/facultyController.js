const userModel = require("../models/Faculty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { secretJWTKey } = require("../middlewares/verify");
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

    const result = await userModel.create(userData);

    return res.json({
      message: "User registration success",
      status: 200,
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    return res.json({
      message: "Something went wrong!!",
      status: 500,
    });
  }
};

const allfaculty = async (req, res) => {
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
    try {
      console.log(req.params.id);
      console.log(req.body);
      const update = await userModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: {
          update,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  };
  const getProfile = async (req, res) => {
      try {
        console.log(req.params.id);
        console.log(req.body);
        const profiledetails = await userModel.findById(req.params.id, {
        });
        res.status(200).json({
          status: "success",
          data: {
            profiledetails,
          },
        });
      } catch (err) {
        res.status(400).json({
          status: "fail",
          message: err,
        });
      }
    };
  

module.exports = {
  registerUser,
  loginUser,
  allfaculty,
  updateProfile,
  getProfile,
};
