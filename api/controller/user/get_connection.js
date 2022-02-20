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
const getConnection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.query;
    let offset = req_body.offset;
    let user_id = req_body.user_id;
    var sql = "WITH fr AS (SELECT f1.user_id, f1.friend_id, f1.status, 'sender' as type FROM friend f1 UNION SELECT f2.friend_id AS user_id, f2.user_id AS friend_id, f2.status, 'receiver' as type FROM friend f2) SELECT u.id as user_id, u.first_name, u.last_name, u.avatar, u.cover_image, fri.status, fri.type, geo.location_city, geo.location_country, IF(fol.following_id IS NULL, FALSE, TRUE) AS following FROM user u LEFT JOIN (SELECT * FROM fr WHERE user_id = ?) fri ON u.id = fri.friend_id LEFT JOIN geo ON geo.id = u.geo_id LEFT JOIN (SELECT * FROM follow WHERE follower_id = ?) fol ON fol.following_id = u.id WHERE u.id != ? LIMIT 20 OFFSET " + offset;
    server_1.conn.getConnector().query(sql, [user_id, user_id, user_id], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when getting friend: " + err
            });
        }
        else {
            req.friend = JSON.parse(JSON.stringify(rows));
            return next();
        }
    });
});
exports.default = getConnection;
