const mongoose = require("mongoose");
const SchemaTypes = mongoose.Schema.Types;
require("dotenv").config();
require("mongoose-long")(mongoose);
const QuestionID = require("./Question");
const Faculty = require("./Faculty");

const AnswerSchema = new mongoose.Schema(
  {
    answerContent: {
      type: String,
      required: true,
    },
    answerBy: {
      type: SchemaTypes.ObjectId,
      ref: "Faculty",
      required: true,
    },
    question: {
      type: SchemaTypes.ObjectId,
      ref: "question",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("answer", AnswerSchema);
