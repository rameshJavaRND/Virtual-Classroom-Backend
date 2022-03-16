const mongoose = require("mongoose");
require("mongoose-long")(mongoose);
const SchemaTypes = mongoose.Schema.Types;
const Student = require("./Student");

const QuestionSchema = new mongoose.Schema(
  {
    quesId: {
      type: SchemaTypes.ObjectId,
      immutable: true,
    },
    quesName: {
      type: String,
      required: true,
    },
    askedby: {
      type: SchemaTypes.ObjectId,
      ref: Student.model("student"),
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("question", QuestionSchema);
