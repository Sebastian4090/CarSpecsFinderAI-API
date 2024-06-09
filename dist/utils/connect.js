"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.connectDB = void 0;
var mongodb_1 = require("mongodb");
var logger_1 = __importDefault(require("./logger"));
var dbConnection;
var connectDB = function () {
    var dbURI = process.env.MONGO_URL;
    return mongodb_1.MongoClient.connect(dbURI)
        .then(function (client) {
        dbConnection = client.db(process.env.DB_NAME);
        logger_1.default.info("MongoDB connected!");
    })
        .catch(function (err) {
        logger_1.default.error("Error connecting to MongoDB!");
        process.exit(1);
    });
};
exports.connectDB = connectDB;
var getDB = function () { return dbConnection; };
exports.getDB = getDB;
//# sourceMappingURL=connect.js.map