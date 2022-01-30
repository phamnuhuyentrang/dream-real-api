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
const connector_1 = __importDefault(require("./connector"));
class CreateTable extends connector_1.default {
    constructor() {
        super();
        this.querys = [
            ["user", "CREATE TABLE `user` (" +
                    "`id` int(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT," +
                    "`username` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
                    "`password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`avatar` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
                    "`cover_image` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
                    "`score` int(11) DEFAULT 0," +
                    "`role` varchar(5) DEFAULT 'user'," +
                    "`created_at` timestamp NULL DEFAULT NULL," +
                    "`updated_at` timestamp NULL DEFAULT NULL," +
                    "`geo_id` int(10) UNSIGNED DEFAULT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"],
            ["album", "CREATE TABLE `album` (" +
                    "`id` int(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT," +
                    "`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP," +
                    "`updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
                    "`description` text COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`geo_id` int(10) UNSIGNED NOT NULL," +
                    "`tag_id` int(10) UNSIGNED DEFAULT NULL," +
                    "`user_id` int(10) UNSIGNED NOT NULL," +
                    "`dream_real` tinyint(4) NOT NULL DEFAULT '0'," +
                    "`score` int(11) NOT NULL DEFAULT '0'," +
                    "`image` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"],
            ["geo", "CREATE TABLE `geo` (" +
                    "`id` int(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT," +
                    "`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP," +
                    "`updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
                    "`latitude` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`longitude` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`location_city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`location_state` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`location_country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`location_country_iso` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`location_formatted` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
                    "`hash` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
                    "`status` tinyint(4) DEFAULT '1'" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"],
            ["comment", "CREATE TABLE `comment` (" +
                    "`id` int(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT," +
                    "`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP," +
                    "`updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
                    "`user_id` int(10) UNSIGNED NOT NULL," +
                    "`album_id` int(10) UNSIGNED NOT NULL," +
                    "`context` varchar(5000) COLLATE utf8mb4_unicode_ci DEFAULT NULL," +
                    "`reply_to` int(10) UNSIGNED" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"],
            ["tag", "CREATE TABLE `tag` (" +
                    "`id` int(10) UNSIGNED  PRIMARY KEY AUTO_INCREMENT," +
                    "`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP," +
                    "`updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
                    "`title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL," +
                    "`slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"],
            ["follow", "CREATE TABLE `follow` (" +
                    "`id` int(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT," +
                    "`following_id` int(10) UNSIGNED NOT NULL," +
                    "`follower_id` int(10) UNSIGNED NOT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"],
            ["react", "CREATE TABLE `react` (" +
                    "`id` int(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT," +
                    "`created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP," +
                    "`updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
                    "`user_id` int(10) UNSIGNED NOT NULL," +
                    "`album_id` int(10) UNSIGNED DEFAULT NULL," +
                    "`comment_id` int(10) UNSIGNED DEFAULT NULL," +
                    "`emoji` int(1) UNSIGNED NOT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"],
            ["favorite", "CREATE TABLE `favorite` (" +
                    "`id` int(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT," +
                    "`user_id` int(10) UNSIGNED NOT NULL," +
                    "`album_id` int(10) UNSIGNED DEFAULT NULL" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"],
            ["friend", "CREATE TABLE `friend` (" +
                    "`id` int(10) UNSIGNED PRIMARY KEY AUTO_INCREMENT," +
                    "`user_id` int(10) UNSIGNED NOT NULL," +
                    "`friend_id` int(10) UNSIGNED DEFAULT NULL," +
                    "`status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending'" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;"],
        ];
    }
    create_table() {
        return __awaiter(this, void 0, void 0, function* () {
            for (var index in this.querys) {
                var table = this.querys[index][0];
                this.db.query(this.querys[index][1], (function (error, results, fields) {
                    var name = table;
                    if (error) {
                        console.log(error);
                    }
                    else {
                        return function () {
                            console.log("Create table " + name + " successfully");
                        };
                    }
                })());
            }
            // this.db.query(this.querys[0][1])
        });
    }
}
var creator = new CreateTable();
creator.create_table();
