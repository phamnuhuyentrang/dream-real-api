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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../server");
const crypto = __importStar(require("crypto"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = yield req.body;
    let email = req_body.email;
    let hashed_email = crypto.createHash('md5').update(email).digest('base64');
    let password = crypto.pbkdf2Sync(req_body.password, hashed_email, 1000, 64, "sha512").toString("base64");
    server_1.conn.getConnector().query("SELECT id, first_name, last_name, avatar, username, role FROM user WHERE email = ? AND password = ?", [email, password], function (err, result) {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error to connect database: " + err
            });
        }
        else {
            if (JSON.parse(JSON.stringify(result))[0] != undefined) {
                let data = JSON.parse(JSON.stringify(result))[0];
                req.username = data.username;
                req.role = data.role;
                req.id = data.id
                req.firstname = data.first_name;
                req.lastname = data.last_name;
                req.avatar = data.avatar;
                return next();
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: "Email/password is not correct"
                });
            }
        }
    });
});
exports.default = login;
