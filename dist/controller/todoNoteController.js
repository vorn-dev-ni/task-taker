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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.getSingleNote = exports.updateNote = exports.postNote = exports.getNote = exports.checkValidaion = void 0;
const mongdb_1 = require("../lib/mongdb");
const mongodb_1 = require("mongodb");
const Error_1 = require("../utils/Error");
const checkValidaion = (next, text, status, completed, method) => {
    if (!text) {
        const errorResponse = new Error_1.ErrorResponse("Text Must not be empty ", 400);
        return next(errorResponse);
    }
    if (text.length <= 3) {
        const errorResponse = new Error_1.ErrorResponse("Text length must be at least 3 character", 400);
        return next(errorResponse);
    }
    if (method === "patch") {
        console.log(typeof status);
        if (status || completed) {
            if (typeof status !== "boolean" || typeof completed !== "boolean") {
                const errorResponse = new Error_1.ErrorResponse("Invalid status or complete must be true or false ", 400);
                return next(errorResponse);
            }
        }
    }
};
exports.checkValidaion = checkValidaion;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, mongdb_1.getDb)().db();
    const query = yield db
        .collection("list")
        .find()
        .sort({ _id: "asc" })
        .toArray();
    res.json(query);
});
exports.getNote = getNote;
const postNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    (0, exports.checkValidaion)(next, text, true, true, "post");
    const db = (0, mongdb_1.getDb)().db();
    try {
        const query = yield db.collection("list").insertOne({
            text,
            created_date: Date.now(),
            status: false,
            completed: false,
        });
        res.status(200).json({
            data: req.body,
        });
    }
    catch (error) {
    }
    finally {
    }
});
exports.postNote = postNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, status, completed } = req.body;
    (0, exports.checkValidaion)(next, text, status, completed, "patch");
    const db = (0, mongdb_1.getDb)().db();
    try {
        const query = yield db.collection("list").updateOne({
            _id: new mongodb_1.ObjectId(req.params.id),
        }, {
            $set: req.body,
        });
        res.status(200).json({
            response: "data has been updated",
            status: 203,
            data: req.body,
        });
    }
    catch (error) {
        next(error);
    }
    finally {
    }
});
exports.updateNote = updateNote;
const getSingleNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, mongdb_1.getDb)().db();
    const query = yield db
        .collection("list")
        .findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
    res.json(query);
});
exports.getSingleNote = getSingleNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, mongdb_1.getDb)().db();
    const query = yield db
        .collection("list")
        .deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) });
    res.json(query);
});
exports.deleteNote = deleteNote;
