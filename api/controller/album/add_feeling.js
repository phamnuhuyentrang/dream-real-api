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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../server");
const dotenv = __importStar(require("dotenv"));
const moment_1 = __importDefault(require("moment"));

const addFeeling = (req, res, next) => {
    let req_body = req.body;
    let title = req_body.title;
    let slug = req_body.slug;
    let url = req_body.url;
    let sql = "SELECT id FROM tag WHERE title = ? AND slug = ?"
    let created_at = moment_1.default(Date.now()).format("YYYY-MM-DD hh:mm:ss");

    server_1.conn.getConnector().query(sql, [title, slug], (err, tag_rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error when collecting existing tag id: " + err
            });
        }else {
            if (JSON.parse(JSON.stringify(tag_rows))[0] != undefined) {
                let id_tag = JSON.parse(JSON.stringify(tag_rows))[0].id;
                req.id_tag = id_tag
                return next()
            }
            else {
                sql = "INSERT INTO tag (created_at, title, slug, url) VALUES ?";
                server_1.conn.getConnector().query(sql, [[[created_at, title, slug, url]]], (err, tag_rows) => {
                    if (err) {
                        return res.status(200).json({
                            success: false,
                            message: "Error when collecting adding tag id: " + err
                        });
                    }
                    else {
                        let id_tag = tag_rows.insertId;
                        req.id_tag = id_tag
                        return next()
                    }
                })
            }
        }
    })
    
};
exports.default = addFeeling;