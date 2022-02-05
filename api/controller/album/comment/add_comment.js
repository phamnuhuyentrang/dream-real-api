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
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = yield req.body;
    let album_id = req_body.album_id;
    let user_id = req_body.user_id;
    let context = req_body.context;
    let created_at = moment_1.default(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    var sql = "INSERT INTO comment (user_id, album_id, created_at, context) VALUES ?";
    server_1.conn.getConnector().query(sql, [[[user_id, album_id, created_at, context]]], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when verifying live location: " + err.message
            });
        }
        else {
            return next();
        }
    });
});
exports.default = addComment;
