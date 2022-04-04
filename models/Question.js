const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const Student = require("./Student");
const Answer = require("./Answer");

const QuestionSchema = new mongoose.Schema(
  {
    quesContent: {
      type: String,
      required: true,
    },
    quesSubject: {
      type: String,
      required: true,
    },
    askedby: {
      type: SchemaTypes.ObjectId,
      ref: "student",
      required: true,
    },
    answer: {
      type: SchemaTypes.ObjectId,
      ref: "answer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("question", QuestionSchema);
