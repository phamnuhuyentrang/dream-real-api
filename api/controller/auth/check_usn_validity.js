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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../server");
const check_usn_validity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = yield req.body;
    let username = req_body.username;
    server_1.conn.getConnector().getConnection((err, connection) => {
        if (err) {
            return res.status(400).json({
                message: "Error when connecting database: " + err
            });
        }
        else {
            // Check if username is already in use
            var sql = "SELECT username FROM user WHERE username = ?";
            connection.query(sql, [username], (err, usn_res) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error when verifying username: " + err
                    });
                }
                else {
                    if (JSON.parse(JSON.stringify(usn_res))[0]) {
                        return res.status(400).json({
                            message: "Username has already been used"
                        });
                    }
                    else {
                        return next();
                    }
                }
            });
        }
        connection.release();
    });
});
exports.default = check_usn_validity;
