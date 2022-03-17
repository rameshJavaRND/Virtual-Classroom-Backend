const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ph_no: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("student", StudentSchema);
