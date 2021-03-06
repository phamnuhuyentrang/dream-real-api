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
            return res.status(200).json({
                success: false,
                message: "Error when getting friend: " + err
            });
        }
        else {
            let r = JSON.parse(JSON.stringify(rows));
            if (r.length === 0) {
                req.friend = []
            }
            else {
                req.friend = r
            }
            // return next();
            sql = "SELECT u.id as user_id, COUNT(u.id) as nb_friends FROM user u LEFT JOIN (SELECT f1.user_id, f1.friend_id, f1.status FROM friend f1 UNION SELECT f2.friend_id AS user_id, f2.user_id AS friend_id, f2.status FROM friend f2) fr ON fr.friend_id = u.id  WHERE fr.status = ? AND u.id = ? GROUP BY u.id;"
            server_1.conn.getConnector().query(sql, ["accepted", user_id], (err, rows) => {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: "Error when counting friend: " + err
                    });
                }
                else {
                    let rs = JSON.parse(JSON.stringify(rows));
                    if (rs.length === 0) {
                        req.nb_friends = 0
                    }
                    else {
                        req.nb_friends = rs[0].nb_friends;
                    }
                    return next();
                }
            });
        }
    });
    
    
});
exports.default = getFriends;
