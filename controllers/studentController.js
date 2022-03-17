const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Student = require("../models/Student");

/**
 * @Author Faraz
 * @Controller Student Register,Login  Controller
 */

const register = async (req, res) => {
  try {
    const student = await Student.create({
      user: req.body.user,
      pass: bcrypt.hashSync(req.body.pass, 8),
      name: req.body.name,
      ph_no: req.body.ph_no,
      year: req.body.year,
      branch: req.body.branch,
    });
    const token = jwt.sign(
      {
        student: student,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    return res.json({
      student,
      access_token: token,
    });
  } catch (error) {
    return res.status(406).send({
      message: "Unable To Register!",
    });
  }
};

const login = async (req, res) => {
  try {
    const student = await Student.findOne({
      user: req.body.user,
    }).exec();

    const passwordIsValid = bcrypt.compareSync(req.body.pass, student.pass);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        student: student,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );
    // if (!req.body.username || !req.body.password) {

    // }
    return res.status(200).send({
      student,
      access_token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(406).send({
      message: "Unable To Login!",
    });
  }
};

module.exports = {
  register,
  login,
};
