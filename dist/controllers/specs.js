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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var openai_1 = __importDefault(require("openai"));
require("../config");
var OPENAI_API_KEY = process.env.OPENAI_API_KEY;
var OPENAI_MODEL = process.env.OPENAI_MODEL;
var systemPrompt = "\n\n  Rules:\n  - Return data in a json format \n  - Don't generate nested json\n  - Don't generate arrays inside json\n  - Always return complex data not only the general one \n\n  User: \"Give me engine specifications of BMW E30 (1982-1994) 2.0\"\n  Assistant:\n  Engine Code: M20B20\n  Horsepower: 127 HP @ 6000rpm\n  Maximum torque: 174 NM @ 4000rpm\n  Displacement: 2.0 liters (1990 cc)\n  Configuration: Inline-6\n  Fuel Type: Petrol (Gasoline)\n  Fuel System: gasoline indirect injection\n  Aspiration: Naturally aspirated\n  Bore: 80mm\n  Stroke: 66mm\n  Compression ratio: 9.8\n  Valve Train: Single Overhead Camshaft\n  Valves per cylinder: 2\n  Engine block material: Cast iron\n  Cylinder head material: Aluminium\n\n  User: \"Give me common problems with Volkswagen Golf Fourth generation (1997\u20132006) 1.6\"\n  Assistant:\n  Electrical problems: This includes issues with various electrical components such as power windows, central locking system, interior lights, and dashboard electronics.\n  Engine Oil Leaks: Oil leaks, particularly from the valve cover gasket and camshaft seals.\n  Cooling System Faults: Coolant leaks, often from the radiator, water pump, or hoses.\n  Exhaust System Rust: Rust can develop in the exhaust system, particularly in regions with harsh climates or road salt usage.\n  Interior Trim Wear and Tear: Interior trim components, including door handles, trim panels, and cup holders, may degrade over time\n  Electrical Wiring Harness Issues: Wiring harness problems, including damaged or corroded wiring.\n";
var callOpenAI = function (userPrompt_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([userPrompt_1], args_1, true), void 0, function (userPrompt, temperature) {
        var openai, completion, content, e_1;
        var _a, _b, _c, _d;
        if (temperature === void 0) { temperature = 0; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    openai = new openai_1.default({ apiKey: OPENAI_API_KEY });
                    return [4 /*yield*/, openai.chat.completions.create({
                            model: OPENAI_MODEL,
                            max_tokens: 512,
                            temperature: temperature,
                            messages: [
                                { role: "system", content: systemPrompt },
                                { role: "user", content: userPrompt },
                            ],
                            response_format: { type: "json_object" },
                        })];
                case 1:
                    completion = _e.sent();
                    content = (_d = (_c = (_b = (_a = completion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "";
                    console.log("OpenAI output: \n", content);
                    return [2 /*return*/, content];
                case 2:
                    e_1 = _e.sent();
                    console.error("Error getting data", e_1);
                    throw e_1;
                case 3: return [2 /*return*/];
            }
        });
    });
};
var handleSpecsPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, car, userPrompt, result, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, car = _a.car, userPrompt = _a.userPrompt;
                if (!car || !userPrompt) {
                    return [2 /*return*/, res.status(400).json({
                            status: false,
                            error: "Can't post specifications",
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, callOpenAI(userPrompt)];
            case 2:
                result = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                console.error("Error parsing JSON", e_2);
                return [3 /*break*/, 4];
            case 4:
                res.json(result);
                return [2 /*return*/];
        }
    });
}); };
exports.default = handleSpecsPost;
//# sourceMappingURL=specs.js.map