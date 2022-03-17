const userModel = require("../models/Faculty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretJWTKey } = require("../middlewares/verify");
const { check, validationResult } = require('express-validator')

/**
 * @Author Bishal
 * @Controller Faculty Register and Login Controller
 */

const registerUser = async (req, res) => {
  try {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.json({ errors });
    }

    const userAlreadyExist = await userModel.findOne({username: req.body.username});

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
      message: "Registration failed!!",
      status: 500,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
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
        username: userExist.username,
        name: userExist.name,
        phone_no: userExist.phone_no,
        subject: userExist.subject,
        branch: userExist.branch,
      },
      secretJWTKey,
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


module.exports = {
  registerUser,
  loginUser,
};
