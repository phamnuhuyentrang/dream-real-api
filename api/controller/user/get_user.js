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
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var sql = "SELECT u.id as user_id, u.first_name, u.last_name, u.avatar FROM user u";
    server_1.conn.getConnector().query(sql, (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when getting user: " + err
            });
        }
        else {
            req.user = JSON.parse(JSON.stringify(rows));
            return next();
        }
    });
});
exports.default = getUser;