"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const Error_1 = require("../utils/Error");
const notFoundMiddleware = (req, res, next) => {
    const errorResponse = new Error_1.ErrorResponse("Page not found", 404);
    next(errorResponse);
};
exports.notFoundMiddleware = notFoundMiddleware;
