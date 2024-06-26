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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = require("../utils/connect");
var mongodb_1 = require("mongodb");
require("../config");
var DB_COLLECTION = process.env.DB_COLLECTION;
var handleFetch = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var data, doc, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = (0, connect_1.getDB)();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, data
                        .collection(DB_COLLECTION)
                        .findOne({ _id: new mongodb_1.ObjectId(req.params.id) })];
            case 2:
                doc = _a.sent();
                if (doc !== null) {
                    return [2 /*return*/, doc];
                }
                else {
                    throw new Error("Data not found");
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                if (err_1 instanceof Error) {
                    console.error("Unable to fetch data:", err_1.message);
                }
                throw new Error("Unable to fetch data " + err_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
var handleData = function (req, data) {
    var type;
    if (req.params.type.includes("=")) {
        type = req.params.type.split("=").join("/");
    }
    else {
        type = req.params.type;
    }
    return data[type] || null;
};
var handleDataGet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rawData, readyData, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, handleFetch(req)];
            case 1:
                rawData = _a.sent();
                readyData = handleData(req, rawData);
                if (readyData !== null) {
                    res.status(200).json(readyData);
                }
                else {
                    res.status(404).json("Data type not found");
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                if (err_2 instanceof Error) {
                    console.error("Error message:", err_2.message);
                    res.status(404).json("Data not found");
                }
                else {
                    console.error("Unknown error:", err_2);
                    res.status(500).json("Can't get data");
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = handleDataGet;
//# sourceMappingURL=cars.js.map