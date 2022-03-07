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
const addToFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.body;
    let user_id = req_body.user_id;
    let album_id = req_body.album_id;
    let action = req_body.action;

    switch (action) {
        case 'favorite':
            var sql = "INSERT INTO favorite(user_id, album_id) VALUES ?";
            server_1.conn.getConnector().query(sql, [[[user_id, album_id]]], (err, rows) => {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: "Error when decline add to favorite: " + err
                    });
                }
                else {
                    return next()
                }
            })
            break;
        case 'unfavorite':
            var sql = "DELETE FROM favorite WHERE user_id = ? AND album_id = ?";
            server_1.conn.getConnector().query(sql, [user_id, album_id], (err, rows) => {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: "Error when decline request friend: " + err
                    });
                }
                else {
                    return next()
                }
            })
        default:
            break;
    }
});
exports.default = addToFavorite;
