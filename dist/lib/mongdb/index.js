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
exports.getDb = exports.connectDb = void 0;
const mongodb_1 = require("mongodb");
const uri = process.env.URL;
const client = new mongodb_1.MongoClient("mongodb+srv://Panhavorn:Panhavorn@cluster0.32xvpf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    client
        .connect()
        .then((result) => {
        return client;
    })
        .catch((err) => console.error(err));
});
exports.connectDb = connectDb;
const getDb = () => {
    return client;
};
exports.getDb = getDb;
