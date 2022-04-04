const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const subjectModel = require("../models/Subject");

const subjectUpload = async (req, res, next) => {
    try {
        const { subjectName } = req.body;
        if (!subjectName) {
            return res.json({ message: "Please provide inputs" });
        }
        const response = await subjectModel.addSubject(subjectName);
        console.log(response);

        if (response._id) {
            res.status(200).json({
                msg:"Success",
                data: response
            })
        }else{
            console.log(error);
            return res.json({
            message: "Something went wrong!!",
            status: 400,
    });
        }
    } catch (error) {
        console.log(error);
        return res.json({
        message: "Something went wrong!!",
        status: 400,
    });
    }
};

const fetchAllSubjects = async(req, res, next) =>{
    try {
        const response = await subjectModel.fetchAllSubjects();
        console.log(response);

        if (response.length > 0) {
            res.status(200).json({
                msg:"Success",
                data: response
            })
        }else{
        console.log(error);
        return res.json({
        message: "Something went wrong!!",
        status: 400,
    });
        }
    } catch (error) {
        console.log(error);
        return res.json({
        message: "Something went wrong!!",
        status: 400,
    });
    }
};

const editSubject = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { subjectName, subjectCode } = req.body;
        console.log(req.body);
        if (!subjectName || !subjectCode) {
            return res.json({ message: "Please provide inputs" });
        }
        const response = await subjectModel.editSubject(id, subjectName, subjectCode);
        console.log(response);

        if (response._id) {
            res.status(200).json({
                msg:"Success",
                data: response
            })
        }else{
            console.log(error);
            return res.json({
            message: "Something went wrong!!",
            status: 400,
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
        message: "Something went wrong!!",
        status: 400,
    });
    }
};

module.exports = {
  subjectUpload,
  fetchAllSubjects,
  editSubject,
};