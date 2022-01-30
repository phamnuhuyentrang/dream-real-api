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
const server_1 = require("../../../../server");
const getComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.query;
    let offset = req_body.offset;
    let album_id = req_body.album_id;
    let user_id = req_body.user_id;
    server_1.conn.getConnector().getConnection((err, connection) => {
        if (err) {
            return res.status(400).json({
                message: "Error when connecting database: " + err
            });
        }
        else {
            var sql = "WITH RECURSIVE descendants AS (SELECT c.reply_to, c.id FROM comment c UNION ALL SELECT d.reply_to, c.id FROM descendants AS d JOIN comment c ON d.id = c.reply_to) SELECT c.id as comment_id, c.updated_at, c.context, u.id as user_id, u.first_name, u.last_name, u.avatar, re.react_count, reply.reply_count, user_react.emoji as user_react FROM comment c LEFT JOIN user u ON c.user_id = u.id LEFT JOIN (SELECT c.id, COUNT(r.emoji) AS react_count FROM comment c JOIN react r ON c.id = r.comment_id GROUP BY c.id) re ON re.id = c.id LEFT JOIN (SELECT reply_to, COUNT(id) AS reply_count FROM descendants WHERE reply_to IS NOT NULL GROUP BY reply_to) reply ON c.id = reply.reply_to LEFT JOIN (SELECT r.emoji, c.id FROM user u LEFT JOIN react r ON u.id = r.user_id LEFT JOIN comment c ON r.comment_id = c.id WHERE u.id = ?) user_react ON user_react.id = c.id WHERE c.album_id = ? ORDER BY c.created_at, re.react_count, reply.reply_count LIMIT 10 OFFSET " + offset;
            connection.query(sql, [user_id, album_id], (err, rows) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error when geting comment: " + err
                    });
                }
                else {
                    req.comment = JSON.parse(JSON.stringify(rows));
                    return next();
                }
            });
        }
    });
});
exports.default = getComment;
