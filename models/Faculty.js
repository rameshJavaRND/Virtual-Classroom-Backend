const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

let facultySchema = new Schema({
  username: {
    require: true,
    unique: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  name: {
    require: true,
    type: String,
  },
  phone_no: {
    require: true,
    type: String,
    maxlength: 10,
  },
  subject: {
    require: true,
    type: String,
  },
  branch: {
    require: true,
    type: String,
  },
},
{
    timestamps: true,
  }
  );

facultySchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Faculty", facultySchema);
