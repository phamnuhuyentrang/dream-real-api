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
const filterAlbumByFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.query;
    let offset = req_body.offset;
    let user_id = req_body.user_id;
    var sql = "WITH follow AS (SELECT u.id as user_id, f.follower_id FROM follow f JOIN user u ON f.following_id = u.id) SELECT a.id as album_id, a.created_at, a.description, u.first_name, u.last_name, u.avatar, u.id as user_id, g.location_city, g.location_country, g.longitude, g.latitude, t.title, t.slug, a.image, co.comment, re.react, user_react.emoji as user_react FROM album a LEFT JOIN follow ON a.user_id = follow.user_id LEFT JOIN geo g ON a.geo_id = g.id LEFT JOIN user u ON follow.user_id = u.id LEFT JOIN tag t ON a.tag_id = t.id JOIN (SELECT a.id, COUNT(c.id) as comment FROM album a LEFT JOIN comment c ON a.id = c.album_id GROUP BY a.id) co ON a.id = co.id JOIN (SELECT a.id, COUNT(r.id) as react FROM album a LEFT JOIN react r ON a.id = r.album_id GROUP BY a.id) re ON a.id = re.id LEFT JOIN (SELECT r.emoji, a.id FROM user u LEFT JOIN react r ON u.id = r.user_id LEFT JOIN album a ON r.album_id = a.id WHERE u.id = ?) user_react ON user_react.id = a.id WHERE follow.follower_id = ? LIMIT 10 OFFSET " + offset;
    server_1.conn.getConnector().query(sql, [user_id, user_id], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when getting album: " + err
            });
        }
        else {
            req.album = JSON.parse(JSON.stringify(rows));
            return next();
        }
    });
});
exports.default = filterAlbumByFollowing;