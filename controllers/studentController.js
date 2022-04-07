const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Student = require("../models/Student");

/**
 * @Author Faraz
 * @Controller Student Register, Login, list Controller
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

// List All Students Details
const list = async (req, res) => {
  const student = await Student.find();
  return res.json({
    student,
  });
};

/**
 * @Author Lavi
 * @Controller Student Update and getProfile Controller
 */

const updateProfile = async (req, res) => {
  const id = req.params.id;

  try {
    await Student.findByIdAndUpdate(id, req.body);
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
  const studentProfile = await Student.findById(id);
  return res.json({
    studentProfile,
  });
}catch{
  res.status(500).json({
      message: "Could not find Profile with id = " + id,
    });
}
};


module.exports = {
  register,
  login,
  list,
  updateProfile,
  getProfile,
};
