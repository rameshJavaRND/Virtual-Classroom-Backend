const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
  branchName: {
    type: String,
    required: true,
    unique: true,
  },
  branchCode: {
    type: String,
    required: true,
    unique: true
  }
}
);

module.exports = mongoose.model("branch", BranchSchema);
