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
const ReactComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // let uuid: string = crypto.randomUUID();
    let req_body = yield req.body;
    let comment_id = req_body.comment_id;
    let user_id = req_body.user_id;
    let created_at = moment_1.default(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    let emoji = req_body.emoji;
    let action = req_body.action;
    if (action === "new react") {
        var sql = "INSERT INTO react(created_at, user_id, comment_id, emoji) VALUES ?";
        server_1.conn.getConnector().query(sql, [[[created_at, user_id, comment_id, emoji]]], (err, rows) => {
            if (err) {
                return res.status(400).send("Error when add reaction: " + err);
            }
            else {
                return next();
            }
        });
    }
    else if (action === "old react") {
        var sql = "UPDATE react SET updated_at = ?, emoji = ? WHERE user_id = ? AND comment_id = ?";
        server_1.conn.getConnector().query(sql, [created_at, emoji, user_id, comment_id], (err, rows) => {
            if (err) {
                return res.status(400).send("Error when change reaction: " + err);
            }
            else {
                return next();
            }
        });
    }
    else if (action === "remove react") {
        var sql = "DELETE FROM react WHERE user_id = ? AND comment_id = ?";
        server_1.conn.getConnector().query(sql, [user_id, comment_id], (err, rows) => {
            if (err) {
                return res.status(400).send("Error when remove reaction: " + err);
            }
            else {
                return next();
            }
        });
    }
    else {
        return res.status(400).json("Error when reacting to comment: Invalid action");
    }
});
exports.default = ReactComment;
