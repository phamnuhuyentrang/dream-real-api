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
const getFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.query;
    let offset = req_body.offset;
    let user_id = req_body.user_id;
    var sql = "SELECT u.id as user_id, u.first_name, u.last_name, u.avatar FROM (SELECT f1.user_id, f1.friend_id, f1.status FROM friend f1 WHERE f1.user_id = ? UNION SELECT f2.friend_id AS user_id, f2.user_id AS friend_id, f2.status FROM friend f2 WHERE f2.friend_id = ?) fr JOIN user u ON fr.friend_id = u.id WHERE fr.status = ? LIMIT 20 OFFSET " + offset;
    server_1.conn.getConnector().query(sql, [user_id, user_id, "accepted"], (err, rows) => {
        if (err) {
            return res.status(400).json({
                message: "Error when getting friend: " + err
            });
        }
        else {
            req.friend = JSON.parse(JSON.stringify(rows));
            return next();
        }
    });
});
exports.default = getFriends;
