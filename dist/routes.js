"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cars_1 = __importDefault(require("./controllers/cars"));
var images_1 = __importDefault(require("./controllers/images"));
var specs_1 = __importDefault(require("./controllers/specs"));
var routes = function (app) {
    app.get("/healthcheck", function (req, res) { return res.sendStatus(200); });
    app.get("/data/:id/:type", function (req, res) {
        return (0, cars_1.default)(req, res);
    });
    app.get("/image/:car", function (req, res) {
        return (0, images_1.default)(req, res);
    });
    app.post("/specs", function (req, res) {
        return (0, specs_1.default)(req, res);
    });
};
exports.default = routes;
//# sourceMappingURL=routes.js.map