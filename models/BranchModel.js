const mongoose = require("mongoose");
const AppError = require("./../utility/appError");
const BranchSchema = new mongoose.Schema({
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
});

const Branch = mongoose.model("Branch", BranchSchema);

exports.addBranch = async (branchName, branchCode) => {
  try {
    const query = { branchName, branchCode }
    return await Branch.create(query);
  } catch (error) {
    return new AppError(error, 401);
  }
}

exports.getAllBranches = async () => {
  try {
    return await Branch.find();
  } catch (error) {
    return new AppError(error, 401);
  }
}
exports.editBranch = async (_id, branchName, branchCode) => {
  try {
    const query = {branchName, branchCode}
    console.log(query);
    return await Branch.findByIdAndUpdate(_id, query);
  } catch (error) {
    return new AppError(error, 401);
  }
}