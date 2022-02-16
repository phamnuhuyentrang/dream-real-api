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
const server_1 = require("../../../server");
const check_email_validity = (req, res, next) =>  {
    let req_body = req.body;
    let email = req_body.email;

    // Check if username is already in use
    var sql = "SELECT email FROM user WHERE email = ?";
    server_1.conn.getConnector().query(sql, [email], (err, email_res) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when verifying email: " + err
            });
        }
        else {
            if (JSON.parse(JSON.stringify(email_res))[0] != undefined) {

                return res.status(200).json({
                    success: false,
                    message: "Email has already been used"
                });
            }
            else {
                return next();
            }
        }
    });
}
exports.default = check_email_validity;
