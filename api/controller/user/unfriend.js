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
const unFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.body;
    let user_id = req_body.user_id;
    let friend_id = req_body.friend_id;
    var sql = "DELETE FROM friend WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)";
    server_1.conn.getConnector().query(sql, [user_id, friend_id, friend_id, user_id], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when decline request friend: " + err
            });
        }
        else {
            return next();
        }
    });
});
exports.default = unFriend;
