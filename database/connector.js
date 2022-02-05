"use strict";
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
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv = __importStar(require("dotenv"));
class Connector {
    constructor() {
        dotenv.config();
        this.db = mysql2_1.default.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_MASTER_NAME,
            password: process.env.DB_MASTER_PASSWORD,
            database: process.env.DB_NAME,
            connectionLimit: 10,
            multipleStatements: true
        });
        this.checkConnection();
    }
    checkConnection() {
        this.db.getConnection((error) => {
            if (error) {
                console.log("Error connect db: " + JSON.stringify(error));
            }
            else {
                console.log('Connected!');
            }
        });
    }
    getConnector() {
        return this.db;
    }
}
exports.default = Connector;
