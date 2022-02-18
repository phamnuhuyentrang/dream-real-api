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
const getFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.query;
    let offset = req_body.offset;
    let user_id = req_body.user_id;
    var sql = "SELECT u.id as user_id, u.first_name, u.last_name, u.avatar FROM follow f JOIN user u ON f.following_id = u.id WHERE f.follower_id = ? LIMIT 10 OFFSET " + offset;
    server_1.conn.getConnector().query(sql, [user_id], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when getting following: " + err
            });
        }
        else {
            let r = JSON.parse(JSON.stringify(rows));
            if (r.length === 0) {
                req.following = []
            }
            else {
                req.following = r
            }
            // return next();
            sql = "SELECT coalesce(count(u.id), 0) as nb_following FROM user u LEFT JOIN follow f ON f.following_id = u.id WHERE f.follower_id = ?"
            server_1.conn.getConnector().query(sql, [user_id], (err, nbrows) => {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: "Error when counting following: " + err
                    });
                }
                else {
                    let rs = JSON.parse(JSON.stringify(nbrows));
                    req.nb_following = rs[0].nb_following;
                    return next();
                }
            });
        }
    });

    // sql = "SELECT coalesce(count(u.id), 0) as nb_following FROM user u LEFT JOIN follow f ON f.following_id = u.id WHERE f.follower_id = ?"
    
});
exports.default = getFollowing;
