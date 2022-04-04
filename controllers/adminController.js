const AdminModel = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Answer = require("../models/Answer");
const Question = require("../models/Question");

/**
 * @Author Mukul, Abhishek
 * @Controller Login, Showdetails Controller
 */

const login = async (req, res) => {
  try {
    const admin = await AdminModel
      .findOne({
        username: req.body.username,
      })
      .exec();

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      admin.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        admin: admin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    return res.status(200).send({
      admin,
      access_token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(406).send({
      message: "Unable To Login!",
    });
  }
};

const showDetails = async (req, res) => {
    try {
        const id=req.params.id;
        const admin_data = await AdminModel.findById(id)
        return res.json(admin_data);
    } catch (error) {
        return res.send(error);
    }
}

/**
 * @Author Faraz, Bishal
 * @Controller List, Edit, Delete Question Controller
 */

const list = async (req, res) => {
  const questions = await Question.find()
    .populate({
      path: "askedby",
      select: "-pass -createdAt -updatedAt",
    })
    .populate({
      path: "answer",
    });
  return res.json({
    questions,
  });
};

const destroy = async (req, res) => {
  const id = req.params.id;

  try {
    await Question.findByIdAndDelete(id);
    await Answer.deleteMany({ question: id });
    res.json({
      message: "Question and answer deleted successfully!",
    });
  } catch {
    res.status(500).json({
      message: "Could not delete Question and answer with id = " + id,
    });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  try {
    await Question.findByIdAndUpdate(id, req.body);
    res.json({
      message: "Question and answer updated successfully!",
    });
  } catch {
    res.status(500).json({
      message: "Could not Edit Question answer with id = " + id,
    });
  }
};

module.exports = {
  login,
  list,
  update,
  destroy,
  showDetails,
};
