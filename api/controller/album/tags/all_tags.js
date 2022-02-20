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

const allTags = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let req_body = req.query;

    let slug = req_body.slug;
    var sql = "SELECT id, title, url FROM tag WHERE slug = ?";
    server_1.conn.getConnector().query(sql, [slug], (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when selecting tag: " + err
            });
        }
        else {
            req.tags = JSON.parse(JSON.stringify(rows))
            return next()
        }
    });
});
exports.default = allTags;