"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongdb_1 = require("./lib/mongdb");
(0, mongdb_1.connectDb)().then((client) => {
    const server = app_1.default.listen(3000, () => {
        console.log("server is running");
    });
    server.on("close", () => {
        console.log("server is close");
    });
});
