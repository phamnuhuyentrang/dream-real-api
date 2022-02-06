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
const getFollower = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.query;
    let offset = req_body.offset;
    let user_id = req_body.user_id;
    var sql = "SELECT u.id as user_id, u.first_name, u.last_name, u.avatar FROM follow f JOIN user u ON f.follower_id = u.id WHERE f.following_id = ? LIMIT 10 OFFSET " + offset;
    server_1.conn.getConnector().query(sql, [user_id], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when getting follower: " + err
            });
        }
        else {
            req.follower = JSON.parse(JSON.stringify(rows));
            // return next();
        }
    });
    
    sql = "SELECT coalesce(count(u.id), 0) as nb_followers FROM follow f JOIN user u ON f.follower_id = u.id WHERE f.following_id = ?"
    server_1.conn.getConnector().query(sql, [user_id], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when getting follower: " + err
            });
        }
        else {
            let rs = JSON.parse(JSON.stringify(rows))
            req.nb_followers = rs[0].nb_followers;
            return next();
        }
    });
});
exports.default = getFollower;
