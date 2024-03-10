"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routes = function (app) {
    app.get('/healthcheck', function (req, res) { return res.sendStatus(200); });
};
exports.default = routes;
//# sourceMappingURL=routes.js.map