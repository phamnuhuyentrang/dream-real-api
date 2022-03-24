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
const getAlbumUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.query;

    let offset = req_body.offset;
    let user_id = req_body.user_id;
    let user_react_id = req_body.user_react_id;
    var sql = "WITH fr AS (SELECT u.id, u.sys_score + u.comm_score AS score, dense_rank() OVER ( ORDER BY u.sys_score + u.comm_score DESC ) AS 'rank' FROM user u) SELECT * FROM fr WHERE fr.id = ? ";
    server_1.conn.getConnector().query(sql, [user_react_id], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when verifying live location: " + err
            });
        }
        else {
            req.user = JSON.parse(JSON.stringify(rows));
            var sql = "WITH tagger AS (SELECT t.album_id as album_id, JSON_ARRAYAGG(JSON_OBJECT('id', u.id, 'first_name', u.first_name, 'last_name', u.last_name, 'avatar', u.avatar)) AS user_tagged FROM taggers t JOIN user u ON t.user_id = u.id JOIN album a ON t.album_id = a.id) SELECT a.id as album_id, a.created_at, a.description, a.dream_real, u.first_name, u.last_name, u.avatar, g.location_city, g.location_country, g.longitude, g.latitude, t.title, t.slug, t.url, a.image, co.comment, re.react, user_react.emoji as user_react, IF(isnull(fa.user_id), 0, 1) as favorite, tagger.user_tagged FROM album a LEFT JOIN geo g ON a.geo_id = g.id LEFT JOIN user u ON a.user_id = u.id LEFT JOIN tag t ON a.tag_id = t.id JOIN (SELECT a.id, COUNT(c.id) as comment FROM album a LEFT JOIN comment c ON a.id = c.album_id GROUP BY a.id) co ON a.id = co.id JOIN (SELECT a.id, COUNT(r.id) as react FROM album a LEFT JOIN react r ON a.id = r.album_id GROUP BY a.id) re ON a.id = re.id LEFT JOIN (SELECT r.emoji, a.id FROM user u LEFT JOIN react r ON u.id = r.user_id LEFT JOIN album a ON r.album_id = a.id WHERE u.id = ?) user_react ON user_react.id = a.id LEFT JOIN (SELECT f.album_id, f.user_id FROM favorite f WHERE f.user_id = ?) fa ON a.id = fa.album_id LEFT JOIN tagger ON a.id = tagger.album_id WHERE a.user_id = ? ORDER BY a.created_at DESC LIMIT 10 OFFSET " + offset;
            server_1.conn.getConnector().query(sql, [user_id, user_id, user_react_id], (err, rows) => {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: "Error when verifying live location: " + err
                    });
                }
                else {
                    req.album = JSON.parse(JSON.stringify(rows));
                    return next();
                }
            });
        }
    });
    
});
exports.default = getAlbumUser;
