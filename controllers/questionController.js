const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Question = require("../models/Question");

/**
 * @Author Faraz
 * @Controller Question Create Controller
 */

const create = async (req, res) => {
  try {
    let questionData = {
      askedby: req.user._id,
      quesName: req.body.quesName,
      subject: req.body.subject,
    };
    const question = await Question.create(questionData);
    return res.json({
      question,
    });
  } catch (error) {
    return res.status(406).send({
      message: "Unable To Add Question!",
    });
  }
};

module.exports = {
  create,
};
