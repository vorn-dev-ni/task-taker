"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const mongdb_1 = require("../lib/mongdb");
const mongodb_1 = require("mongodb");
exports.router = express_1.default.Router();
exports.router.param("id", (req, res, next, val) => __awaiter(void 0, void 0, void 0, function* () {
    if (val) {
        if (!mongodb_1.ObjectId.isValid(val)) {
            return res.status(404).json({
                message: val + " does not exist ",
            });
        }
        const db = yield (0, mongdb_1.getDb)().db();
        const query = yield db
            .collection("list")
            .find({ _id: new mongodb_1.ObjectId(val !== null && val !== void 0 ? val : "") })
            .toArray();
        if (!query.length) {
            return res.status(404).json({
                message: val + " does not exist ",
            });
        }
    }
    return next();
}));
exports.router.get("", controller_1.todoNoteController.getNote);
exports.router.post("/create", controller_1.todoNoteController.postNote);
exports.router
    .route("/:id")
    .get(controller_1.todoNoteController.getSingleNote)
    .put(controller_1.todoNoteController.updateNote)
    .delete(controller_1.todoNoteController.deleteNote);
