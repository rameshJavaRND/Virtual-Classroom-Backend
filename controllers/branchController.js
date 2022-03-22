const BranchModel = require("../models/BranchModel");
const AppError = require("./../utility/appError");

exports.addBranch = async(req, res, next) => {
    try {
        console.log(req.body);       
        const { branchName, branchCode } = req.body;
        if (!branchName || !branchCode) {
            next(new AppError('please provide inputs', 401));
        } 
        const response = await BranchModel.addBranch(branchName, branchCode);
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

exports.getAllBranches = async(req, res, next) => {
    try {
        const response = await BranchModel.getAllBranches();
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
};

exports.editBranch = async(req, res, next) => {
    try {
        const id = req.params.id;
        if(!id){
            next(new AppError("Please provide branch id", 401))
        }
        const {branchName:branchName, branchCode:branchCode} = req.body;
        console.log(branchName, branchCode);
        if(!branchName || !branchCode){
            next(new AppError("Please provide all inputs", 401))
        }
        const response = await BranchModel.editBranch(id,branchName,branchCode);
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