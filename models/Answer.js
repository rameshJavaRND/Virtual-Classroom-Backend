const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();
require("mongoose-long")(mongoose);
const QuestionID = require("./Question");

const AnswerSchema = new mongoose.Schema(
  {
    quesId: {
      type: SchemaTypes.ObjectId,
      ref: QuestionID.model("question"),
      immutable: true,
    },
    answer: {
      type: String,
      required: true,
    },
    answerBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("question", AnswerSchema);
