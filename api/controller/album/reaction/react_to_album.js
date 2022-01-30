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
const server_1 = require("../../../server");
const moment_1 = __importDefault(require("moment"));
const ReactAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // let uuid: string = crypto.randomUUID();
    let req_body = yield req.body;
    let album_id = req_body.album_id;
    let user_id = req_body.user_id;
    let created_at = moment_1.default(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    let emoji = req_body.emoji;
    let action = req_body.action;
    server_1.conn.getConnector().getConnection((err, connection) => {
        if (err) {
            return res.status(400).json({
                message: "Error when connecting database: " + err
            });
        }
        else {
            if (action === "new react") {
                var sql = "INSERT INTO react(created_at, user_id, album_id, emoji) VALUES ?";
                connection.query(sql, [[[created_at, user_id, album_id, emoji]]], (err, rows) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error when add reaction: " + err
                        });
                    }
                    else {
                        return next();
                    }
                });
            }
            else if (action === "old react") {
                var sql = "UPDATE react SET updated_at = ?, emoji = ? WHERE user_id = ? AND album_id = ?";
                connection.query(sql, [created_at, emoji, user_id, album_id], (err, rows) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error when change reaction: " + err
                        });
                    }
                    else {
                        return next();
                    }
                });
            }
            else if (action === "remove react") {
                var sql = "DELETE FROM react WHERE user_id = ? AND album_id = ?";
                connection.query(sql, [user_id, album_id], (err, rows) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error when remove reaction: " + err
                        });
                    }
                    else {
                        return next();
                    }
                });
            }
        }
    });
});
exports.default = ReactAlbum;
