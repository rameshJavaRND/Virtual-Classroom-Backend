const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
  subjectName: {
    type: String,
    required: true,
    unique: true
  },
  subjectCode: {
    type: String,
    required: true,
    unique: true
  }
}
);

module.exports = mongoose.model("subject", SubjectSchema);
