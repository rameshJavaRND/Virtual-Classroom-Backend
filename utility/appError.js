const mongoose = require('mongoose');
class AppError extends Error {
    constructor(massage,statusCode){
        super(massage)
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')? 'Failed': 'error';
        this.massage = massage;
    }
};
module.exports = AppError;