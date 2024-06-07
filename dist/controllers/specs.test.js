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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var specs_1 = __importDefault(require("./specs"));
jest.mock("openai", function () {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(function () {
            return {
                chat: {
                    completions: {
                        create: jest.fn().mockResolvedValue({
                            choices: [
                                {
                                    message: {
                                        content: JSON.stringify({
                                            "Engine Code": "M20B20",
                                            Horsepower: "127 HP @ 6000rpm",
                                            "Maximum torque": "174 NM @ 4000rpm",
                                            Displacement: "2.0 liters (1990 cc)",
                                            Configuration: "Inline-6",
                                            "Recommended oil": "5W-40 Synthetic",
                                            "Fuel Type": "Petrol (Gasoline)",
                                            "Fuel System": "Gasoline indirect injection",
                                            Aspiration: "Naturally aspirated",
                                            "Stock boost pressure": "Not applicable",
                                            Bore: "80mm",
                                            Stroke: "66mm",
                                            "Compression ratio": "9.8",
                                            "Valve Train": "Single Overhead Camshaft",
                                            "Valves per cylinder": "2",
                                            "Engine block material": "Cast iron",
                                            "Cylinder head material": "Aluminium",
                                        }),
                                    },
                                },
                            ],
                        }),
                    },
                },
            };
        }),
    };
});
describe("POST /specs", function () {
    it("should return JSON response from OpenAI", function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, json, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = {
                        body: {
                            userPrompt: "Give me engine specifications of BMW E30 (1982-1994) 2.0",
                        },
                    };
                    json = jest.fn();
                    res = { json: json };
                    return [4 /*yield*/, (0, specs_1.default)(req, res)];
                case 1:
                    _a.sent();
                    expect(json).toHaveBeenCalledWith(JSON.stringify({
                        "Engine Code": "M20B20",
                        Horsepower: "127 HP @ 6000rpm",
                        "Maximum torque": "174 NM @ 4000rpm",
                        Displacement: "2.0 liters (1990 cc)",
                        Configuration: "Inline-6",
                        "Recommended oil": "5W-40 Synthetic",
                        "Fuel Type": "Petrol (Gasoline)",
                        "Fuel System": "Gasoline indirect injection",
                        Aspiration: "Naturally aspirated",
                        "Stock boost pressure": "Not applicable",
                        Bore: "80mm",
                        Stroke: "66mm",
                        "Compression ratio": "9.8",
                        "Valve Train": "Single Overhead Camshaft",
                        "Valves per cylinder": "2",
                        "Engine block material": "Cast iron",
                        "Cylinder head material": "Aluminium",
                    }));
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return an error if no userPrompt is provided", function () { return __awaiter(void 0, void 0, void 0, function () {
        var req, json, status, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = { body: {} };
                    json = jest.fn();
                    status = jest.fn().mockReturnThis();
                    res = { status: status, json: json };
                    return [4 /*yield*/, (0, specs_1.default)(req, res)];
                case 1:
                    _a.sent();
                    expect(status).toHaveBeenCalledWith(400);
                    expect(json).toHaveBeenCalledWith({
                        status: false,
                        error: "Can't post specifications",
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=specs.test.js.map