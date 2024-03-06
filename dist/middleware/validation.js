"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = void 0;
const Error_1 = require("../utils/Error");
const validationHandler = (err, req, res) => {
    const errorResponse = new Error_1.ErrorResponse(err, 404);
    res.status(400).json({
        message: errorResponse.message,
        status: errorResponse.statusCode,
    });
};
exports.validationHandler = validationHandler;
