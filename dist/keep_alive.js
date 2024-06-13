"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var https_1 = __importDefault(require("https"));
var healthcheckUrl = process.env.HEALTHCHECK;
var healthCheck = function () {
    https_1.default
        .get(healthcheckUrl, function (res) {
        var data = "";
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            console.log("Healthcheck response: ".concat(data));
        });
    })
        .on("error", function (error) {
        console.error("Error during healthcheck:", error);
    });
};
// 1min
var keepAlive = function () {
    setInterval(healthCheck, 1 * 60 * 1000);
};
exports.default = keepAlive;
//# sourceMappingURL=keep_alive.js.map