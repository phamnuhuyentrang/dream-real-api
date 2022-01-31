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
const axios_1 = __importDefault(require("axios"));
const server_1 = require("../../../server");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv = __importStar(require("dotenv"));
const file_type_1 = import("file-type");
const crypto = __importStar(require("crypto"));
const moment_1 = __importDefault(require("moment"));
dotenv.config();
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Local variables
    let avatar_uri = null; // avatar (user)
    let cover_uri = null; // cover (user)
    let lat = "";
    let long = "";
    let created_at = moment_1.default(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    // Required parameters
    let req_body = yield req.body;
    let first_name = req_body.first_name;
    let last_name = req_body.last_name;
    let email = req_body.email;
    let username = req_body.username;
    let hashed_email = crypto.createHash('md5').update(email).digest('base64'); // username (user)
    let password = crypto.pbkdf2Sync(req_body.password, hashed_email, 1000, 64, "sha512").toString("base64");
    if (req_body.avatar != undefined) {
        let avatar = Buffer.from(req_body.avatar, "utf-8");
        // Upload avatar to AWS S3 Storage
        let avatar_img_type = yield file_type_1.fileTypeFromBuffer(avatar);
        if (avatar_img_type == undefined) {
            return res.status(400).json({
                message: "Error when uploading avatar: Unable to detect extension of uploaded avatar"
            });
        }
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: "/avatar/" + username + "." + avatar_img_type.ext,
            Body: avatar
        };
        s3.upload(params, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Error when uploading avatar: " + err.message
                });
            }
            else {
                avatar_uri = data.Location.replace(process.env.S3_URL, "");
            }
        });
    }
    else {
        avatar_uri = "/letter-avatar/" + last_name[0].toUpperCase() + ".png";
    }
    if (req_body.cover != undefined) {
        let cover = Buffer.from(req_body.cover, "utf-8");
        // Upload cover to AWS S3 Storage
        let cover_img_type = yield file_type_1.fileTypeFromBuffer(cover);
        if (cover_img_type == undefined) {
            return res.status(400).json({
                message: "Error when uploading cover: Unable to detect extension of uploaded cover"
            });
        }
        const params_cover = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: "/cover/" + username + "." + cover_img_type.ext,
            Body: cover
        };
        s3.upload(params_cover, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Error when uploading cover: " + err.message
                });
            }
            else {
                cover_uri = data.Location;
            }
        });
    }
    else {
        cover_uri = "/cover/default.jpg";
    }
    // Create empty folder for user's album
    s3.putObject({
        ACL: "public-read-write",
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "/album/" + username + "/"
    }, function (err, data) {
        if (err) {
            return res.status(400).json({
                message: "Error when creating repository for album: " + err.message
            });
        }
    });
    if (req_body.location_hash != undefined && req_body.info_lives != undefined) {
        let location_hash = req_body.location_hash; // location_hash (geo)
        let info_lives = req_body.info_lives; // location_formatted (geo)
        let lives = info_lives.split(",");
        let country = lives[lives.length - 1];
        let city = lives[0];
        let state = "";
        if (info_lives.length > 2) {
            state = lives[lives.length - 2];
        }
        let country_code = ""; // location_country_iso (geo)
        let fetch_country = yield axios_1.default.get("https://restcountries.com/v3.1/name/" + country);
        let fetch_res = JSON.parse(JSON.stringify(fetch_country.data));
        if (!Array.isArray(fetch_res)) {
            return res.status(400).json({
                message: "Error when finding living country ISO code: " + fetch_res.message
            });
        }
        else {
            country_code = fetch_res[0].cca3;
        }
        // Get latitude & longitude
        let result = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json`, {
            params: {
                fields: "geometry",
                input: info_lives,
                inputtype: "textquery",
                key: process.env.MAPS_KEY
            }
        });
        let data = JSON.parse(JSON.stringify(result.data));
        if (data.status != "OK") {
            return res.status(400).json({
                message: "Error when finding living location coordinate: " + data.error_message
            });
        }
        else {
            lat = data.candidates[0].geometry.location.lat;
            long = data.candidates[0].geometry.location.lng;
        }
        // Add to database
        var sql = "SELECT id, location_formatted FROM geo WHERE location_formatted = ?";
        server_1.conn.getConnector().query(sql, [info_lives], (err, geo_rows) => {
            if (err) {
                return res.status(400).json({
                    message: "Error when verifying live location: " + err
                });
            }
            else {
                var geo_id = null;
                if (JSON.parse(JSON.stringify(geo_rows))[0] != undefined) {
                    geo_id = JSON.parse(JSON.stringify(geo_rows))[0].id;
                }
                else {
                    var sql = "INSERT INTO geo (created_at, latitude, longitude, location_city, location_state, location_country, location_country_iso, location_formatted, hash) VALUES ?";
                    server_1.conn.getConnector().query(sql, [[[created_at, lat, long, city, state, country, country_code, info_lives, location_hash]]], (err, result_geos) => {
                        if (err) {
                            return res.status(400).json({
                                message: "Error when saving living location: " + err
                            });
                        }
                        console.log("Insert into geo successfully");
                        // get geo_id
                        geo_id = result_geos.insertId;
                    });
                }
                var sql = "INSERT INTO user (username, first_name, last_name, email, password, avatar, cover_image, created_at, geo_id) VALUES ?";
                server_1.conn.getConnector().query(sql, [[[username, first_name, last_name, email, password, avatar_uri, cover_uri, created_at, geo_id]]], function (err, result) {
                    if (err) {
                        return res.status(400).json({
                            message: "Error when creating new user: " + err
                        });
                    }
                    else {
                        return next();
                    }
                });
            }
        });
    }
    else {
        var sql = "INSERT INTO user (username, first_name, last_name, email, password, avatar, cover_image, created_at) VALUES ?";
        server_1.conn.getConnector().query(sql, [[[username, first_name, last_name, email, password, avatar_uri, cover_uri, created_at]]], function (err, result) {
            if (err) {
                return res.status(400).json({
                    message: "Error when creating new user: " + err
                });
            }
            else {
                return next();
            }
        });
    }
});
exports.default = register;
