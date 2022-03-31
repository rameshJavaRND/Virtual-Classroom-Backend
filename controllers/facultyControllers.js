
const Faculty = require("../models/FacultyModel");


exports.updateFAcultyProfile = async (req, res) => {
    try {
      console.log(req.params.id);
      console.log(req.body);
      const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: {
          faculty,
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
    const faculty = await Faculty.findById(req.params.id, {
      
    });
    res.status(200).json({
      status: "success",
      data: {
        faculty,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
