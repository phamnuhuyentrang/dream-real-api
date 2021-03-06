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
const Follow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.body;
    let user_id = req_body.user_id;
    let user_follow_id = req_body.user_follow_id;
    var sql = "INSERT INTO follow (following_id, follower_id) VALUES ?";
    server_1.conn.getConnector().query(sql, [[[user_follow_id, user_id]]], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when insert follow: " + err
            });
        }
        else {
            sql = "UPDATE user SET comm_score = comm_score + 5 WHERE user.id = ?"
            server_1.conn.getConnector().query(sql, [user_id], function (err, updateResult) {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: "Error when updating score: " + err.message
                    });
                }
                else {
                    return next();
                }
            })
        }
    });
});
exports.default = Follow;
