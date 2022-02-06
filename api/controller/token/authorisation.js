"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(req.cookies)
    if (!token) {
        return res.status(200).json({
            message: "Forbidden. Cookie needed",
            success: false
        });
    }
    else {
        try {
            const data = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            req.username = data.username;
            req.role = data.role;
            return next();
        }
        catch (_a) {
            console.log(_a)
            return res.status(200).json({
                message: "Forbidden. Cookie invalid",
                success: false
            });
        }
    }
};
exports.default = authorization;
