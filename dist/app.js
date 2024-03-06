"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const error_1 = require("./middleware/error");
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
if ((_a = process.env.NODE_ENV) === null || _a === void 0 ? void 0 : _a.startsWith("development")) {
    app.use((0, morgan_1.default)('dev'));
}
console.log(process.env.NODE_ENV);
app.use("/resource", express_1.default.static(__dirname + "public/images/"));
app.use("/api", routes_1.router);
app.all("*", error_1.notFoundMiddleware);
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
        statusCode: err.statusCode,
    });
});
exports.default = app;
