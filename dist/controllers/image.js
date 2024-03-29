"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serpapi_1 = require("serpapi");
require("../config");
var IMAGE_API_KEY = process.env.IMAGE_API_KEY;
var handleImageGet = function (req, res) {
    console.log(req.params.car);
    (0, serpapi_1.getJson)({
        engine: "google_images",
        google_domain: "google.com",
        q: "".concat(req.params.car, " wikipedia"),
        gl: "pl",
        safe: "active",
        ijn: "0.1",
        tbs: "car",
        api_key: IMAGE_API_KEY,
    }, function (img) {
        res.json(img.images_results[0].original);
    });
};
exports.default = handleImageGet;
//# sourceMappingURL=image.js.map