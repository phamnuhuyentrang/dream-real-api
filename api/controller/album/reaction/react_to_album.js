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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../../server");
const moment_1 = __importDefault(require("moment"));
const ReactAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // let uuid: string = crypto.randomUUID();
    let req_body = yield req.body;
    let album_id = req_body.album_id;
    let user_id = req_body.user_id;
    let created_at = moment_1.default(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    let emoji = req_body.emoji;
    let action = req_body.action;
    if (action === "new react") {
        var sql = "INSERT INTO react(created_at, user_id, album_id, emoji) VALUES ?";
        server_1.conn.getConnector().query(sql, [[[created_at, user_id, album_id, emoji]]], (err, rows) => {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: "Error when adding reaction: " + err
                });
            }
            else {
                sql = "UPDATE user JOIN album ON album.user_id = user.id SET user.comm_score = user.comm_score + 5 WHERE album.id = ?"
                server_1.conn.getConnector().query(sql, [album_id], function (err, updateResult) {
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
    }
    else if (action === "old react") {
        var sql = "UPDATE react SET updated_at = ?, emoji = ? WHERE user_id = ? AND album_id = ?";
        server_1.conn.getConnector().query(sql, [created_at, emoji, user_id, album_id], (err, rows) => {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: "Error when changing reaction: " + err
                });
            }
            else {
                return next();
            }
        });
    }
    else if (action === "remove react") {
        var sql = "DELETE FROM react WHERE user_id = ? AND album_id = ?";
        server_1.conn.getConnector().query(sql, [user_id, album_id], (err, rows) => {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: "Error when removing reaction: " + err
                });
            }
            else {
                sql = "UPDATE user JOIN album ON album.user_id = user.id SET user.comm_score = user.comm_score - 5 WHERE album.id = ?"
                server_1.conn.getConnector().query(sql, [album_id], function (err, updateResult) {
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
    }
    else {
        return res.status(200).json({
            success: false,
            message: "Error when reacting to album: Invalid action"
        })
    }
});
exports.default = ReactAlbum;
