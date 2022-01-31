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
const dotenv = __importStar(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const file_type_1 = import("file-type");
const moment_1 = __importDefault(require("moment"));
dotenv.config();
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
});
const createAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let img_name = crypto_1.default.randomUUID();
    let req_body = yield req.body;
    let location = req_body.location; // location_formatted (geo)
    let image = Buffer.from(req_body.image, "utf-8");
    let location_hash = req_body.location_hash; // location_hash (geo)
    let dream_real = req_body.dream_real;
    let description = req_body.description;
    let username = req_body.username; // username (user)
    let user_id = req_body.id_user;
    let tag_id = req_body.id_tag;
    let lat = "";
    let long = "";
    let image_uri = "";
    let lives = location.split(",");
    let country = lives[lives.length - 1];
    let city = lives[0];
    let state = "";
    if (location.length > 2) {
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
    // Upload image to AWS S3 Storage
    let image_img_type = yield file_type_1.fileTypeFromBuffer(image);
    if (image_img_type == undefined) {
        return res.status(400).json({
            message: "Error when uploading image: Unable to detect extension of uploaded image"
        });
    }
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "/album/" + username + "/" + img_name + "." + image_img_type.ext,
        Body: image
    };
    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(400).json({
                message: "Error when uploading image: " + err.message
            });
        }
        else {
            image_uri = data.Location.replace(process.env.S3_URL, "");
        }
    });
    // Get location hash
    let result = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json`, {
        params: {
            fields: "geometry",
            input: location,
            inputtype: "textquery",
            key: process.env.MAPS_KEY
        }
    });
    let data = JSON.parse(JSON.stringify(result.data));
    if (data.status != "OK") {
        return res.status(400).json({
            message: "Error when finding living location coordinates: " + data.error_message
        });
    }
    else {
        lat = data.candidates[0].geometry.location.lat;
        long = data.candidates[0].geometry.location.lng;
    }
    let created_at = moment_1.default(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var sql = "SELECT id, location_formatted FROM geo WHERE location_formatted = ?";
    server_1.conn.getConnector().query(sql, [location], (err, geo_rows) => {
        if (err) {
            return res.status(400).json({
                message: "Error when collecting existing geo id: " + err
            });
        }
        else {
            var geo_id = null;
            if (JSON.parse(JSON.stringify(geo_rows))[0] != undefined) {
                geo_id = JSON.parse(JSON.stringify(geo_rows))[0].id;
            }
            else {
                sql = "INSERT INTO geo (created_at, latitude, longitude, location_city, location_state, location_country, location_country_iso, location_formatted, hash) VALUES ?";
                server_1.conn.getConnector().query(sql, [[[created_at, lat, long, city, state, country, country_code, location, location_hash]]], (err, result_geos) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error when saving living location: " + err
                        });
                    }
                    console.log("Insert into geo successfully");
                    geo_id = result_geos.insertId;
                });
            }
            sql = "INSERT INTO album (created_at, description, geo_id, tag_id, user_id, dream_real, image) VALUES ?";
            server_1.conn.getConnector().query(sql, [[[created_at, description, geo_id, tag_id, user_id, dream_real, image_uri]]], function (err, result) {
                if (err) {
                    return res.status(400),json({
                        message: "Error when adding new album: " + err.message
                    });
                }
                else {
                    return next();
                }
            });
        }
    });
});
exports.default = createAlbum;
