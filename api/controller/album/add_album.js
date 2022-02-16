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
const axios = require("axios");
const server_1 = require("../../../server");
const dotenv = __importStar(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const moment_1 = __importDefault(require("moment"));
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

dotenv.config();
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
});
const createAlbum = async (req, res, next) => {
    let req_body = req.body;
    let location = req_body.location; // location_formatted (geo)
    let location_hash = req_body.location_hash; // location_hash (geo)
    let dream_real = req_body.dream_real;
    let description = req_body.description;
    let username = req_body.username; // username (user)
    let user_id = req_body.user_id;
    let tag_id = req_body.id_tag;
    let lat = "";
    let long = "";

    let image_uri = "album/" + username + "/" + req.file.originalname;
    let lives = location.split(",");
    let country = lives[lives.length - 1];
    let city = lives[0];
    let state = "";
    if (location.length > 2) {
        state = lives[lives.length - 2];
    }
    let country_code = ""; // location_country_iso (geo)
    const fetch_country = await fetch("https://restcountries.com/v3.1/name/" + country, {
        "method": "GET"
    })
    try {
        let fetch_res = JSON.parse(JSON.stringify(await fetch_country.json()));
        if (!Array.isArray(fetch_res)) {
            return res.status(200).json({
                success: false,
                message: "Error when finding living country ISO code: " + fetch_res.message
            });
        }
        else {
            country_code = fetch_res[0].cca3;
        }
    }
    catch(error) {
        return res.status(200).json({
            success: false,
            message: "Error when finding country ISO code: " + error
        })
    }
    
    
    // Get location hash
    const result = await fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=geometry&input=" + location + "&inputtype=textquery&key=" + process.env.MAPS_KEY, {
        "method": "GET"
    })
    try {
        let data = JSON.parse(JSON.stringify(await result.json()));
        lat = data.candidates[0].geometry.location.lat;
        long = data.candidates[0].geometry.location.lng;
    }
    catch(error) {
        return res.status(200).json({
            success: false,
            message: "Error when finding location coordinates: " + error
        })
    }

    let created_at = moment_1.default(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    var sql = "SELECT id, location_formatted FROM geo WHERE location_formatted = ?";
    server_1.conn.getConnector().query(sql, [location], (err, geo_rows) => {
        if (err) {
            return res.status(200).json({
                success: false,
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
                        return res.status(200).json({
                            success: false,
                            message: "Error when saving living location: " + err
                        });
                    }
                    geo_id = result_geos.insertId;
                });
            }
            sql = "INSERT INTO album (created_at, description, geo_id, tag_id, user_id, dream_real, image) VALUES ?";
            server_1.conn.getConnector().query(sql, [[[created_at, description, geo_id, tag_id, user_id, dream_real, image_uri]]], function (err, result) {
                if (err) {
                    return res.status(200).json({
                        success: false,
                        message: "Error when adding new album: " + err.message
                    });
                }
                else {
                    return next();
                }
            });
        }
    });
}
exports.default = createAlbum;
