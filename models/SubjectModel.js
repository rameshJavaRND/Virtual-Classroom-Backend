const mongoose = require("mongoose");
const AppError = require("./../utility/appError");
const SubjectSchema = new mongoose.Schema({
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
});

const Subject = mongoose.model("subject", SubjectSchema);

exports.addSubject = async(subjectName) => {
  const name = {subjectName}
  console.log(name);
 try{
  return await Subject.create(name)
}catch(error){
  return new AppError(error, 400);
  }
};

exports.fetchAllSubjects = async() => {
  try {
    return await Subject.find()
  } catch (error) {
    return new AppError(error, 400);
  }
};
exports.editSubject = async(_id, subjectName, subjectCode) => {
  try {
    const query = {subjectName, subjectCode};
    return await Subject.findByIdAndUpdate(_id, query)
  } catch (error) {
    return new AppError(error, 400);
  }
};