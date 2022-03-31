
const Student = require("../models/StudentModel");


exports.updateFAcultyProfile = async (req, res) => {
    try {
      console.log(req.params.id);
      console.log(req.body);
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: {
          student,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  };
  exports.getFAcultyProfile = async (req, res) => {
      try {
        console.log(req.params.id);
        console.log(req.body);
        const student = await Student.findById(req.params.id, {
        });
        res.status(200).json({
          status: "success",
          data: {
            student,
          },
        });
      } catch (err) {
        res.status(400).json({
          status: "fail",
          message: err,
        });
      }
    };
  