const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Answer = require("../models/Answer");
const Question = require("../models/Question");

/**
 * @Author Faraz
 * @Controller Answer Create and List Controller
 */

const create = async (req, res) => {
  try {
    let answerData = {
      answerContent: req.body.answerContent,
      question: req.body.question,
      answerBy: req.user._id,
    };
    const answer = await Answer.create(answerData);
    await Question.findByIdAndUpdate(req.body.question, {
      answer: answer._id,
    });
    return res.json({
      answer,
    });
  } catch (error) {
    return res.status(406).send({
      message: "Unable To Add Answer!",
    });
  }
};

const list = async (req, res) => {
  const answers = await Answer.find()
    .populate({
      path: "answerBy",
      select: "-password -createdAt -updatedAt",
    })
    .populate("question");
  return res.json({
    answers,
  });
};

module.exports = {
  create,
  list,
};
