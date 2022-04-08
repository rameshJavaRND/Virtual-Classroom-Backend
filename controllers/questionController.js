const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Question = require("../models/Question");

/**
 * @Author Faraz
 * @Controller Question Create and List Controller
 */

const create = async (req, res) => {
  try {
    let questionData = {
      quesContent: req.body.quesContent,
      quesSubject: req.body.quesSubject,
      askedby: req.user._id,
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

module.exports = {
  create,
  list,
};
