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

const getAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var sql = "SELECT u.id AS user_id, u.avatar FROM user u WHERE u.role = 'admin' LIMIT 16" ;
    server_1.conn.getConnector().query(sql, (err, rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when getting friend: " + err
            });
        }
        else {
            req.admin = JSON.parse(JSON.stringify(rows));
            return next();
        }
    });
});
exports.default = getAdmin;