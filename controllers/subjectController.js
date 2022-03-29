const subjectModel = require("../models/SubjectModel");
const AppError = require("./../utility/appError");

exports.subjectUpload = async (req, res, next) => {
    try {
        const { subjectName } = req.body;
        if (!subjectName) {
            next(new AppError('please provide inputs', 401));
        }
        const response = await subjectModel.addSubject(subjectName);
        console.log(response);

        if (response._id) {
            res.status(200).json({
                msg:"Success",
                data: response
            })
        }else{
            next(new AppError(response,400))
        }
    } catch (error) {
        next(new AppError(error, 400));
    }
};

exports.fetchAllSubjects = async(req, res, next) =>{
    try {
        const response = await subjectModel.fetchAllSubjects();
        console.log(response);

        if (response.length > 0) {
            res.status(200).json({
                msg:"Success",
                data: response
            })
        }else{
            next(new AppError(response,400))
        }
    } catch (error) {
        next(new AppError(error, 400));
    }
}
exports.editSubject = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { subjectName, subjectCode } = req.body;
        console.log(req.body);
        if (!subjectName || !subjectCode) {
            next(new AppError('please provide inputs', 401));
        }
        const response = await subjectModel.editSubject(id, subjectName, subjectCode);
        console.log(response);

        if (response._id) {
            res.status(200).json({
                msg:"Success",
                data: response
            })
        }else{
            next(new AppError(response,400))
        }
    } catch (error) {
        next(new AppError(error, 400));
    }
};