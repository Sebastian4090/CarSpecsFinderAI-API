"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
var PORT = Number(process.env.PORT);
var app = (0, express_1.default)();
app.use(cors_1.default);
app.use(compression_1.default);
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('success');
});
app.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
    (0, routes_1.default)(app);
});
//# sourceMappingURL=index.js.map