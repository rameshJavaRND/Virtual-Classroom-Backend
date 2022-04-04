const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const BranchModel = require("../models/Branch");

const addBranch = async(req, res, next) => {
    try {
        console.log(req.body);       
        const { branchName, branchCode } = req.body;
        if (!branchName || !branchCode) {
            return res.json({ message: "Please provide inputs" });
        } 
        const response = await BranchModel.addBranch(branchName, branchCode);
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

const getAllBranches = async(req, res, next) => {
    try {
        const response = await BranchModel.getAllBranches();
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

const editBranch = async(req, res, next) => {
    try {
        const id = req.params.id;
        if(!id){
            return res.json({ message: "Please provide branch id" });
        }
        const {branchName:branchName, branchCode:branchCode} = req.body;
        console.log(branchName, branchCode);
        if(!branchName || !branchCode){
            return res.json({ message: "Please provide all inputs" });
        }
        const response = await BranchModel.editBranch(id,branchName,branchCode);
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
  addBranch,
  getAllBranches,
  editBranch,
};