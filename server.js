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
const connector_1 = __importDefault(require("./database/connector"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const main_controller_1 = __importDefault(require("./api/controller/main_controller"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multerS3 = require('multer-s3')
const multer = require('multer')

dotenv.config();
exports.conn = new connector_1.default();

const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
});

exports.s3 = s3;

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        key: function(req, file, cb) {
            cb(null, file.fieldname + "/" + req.body.username + "." + extension)
        }
    })
});

const uploadAlbum = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        key: function(req, file, cb) {
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            cb(null, "album/" + req.body.username + "/" + file.originalname)
        }
    })
})

const app = express_1.default();
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.json());

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to API Dream Real"
    });
})

app.post("/usn_validity", main_controller_1.default.check_usn_validity, (req, res) => {
    return res.status(200).json({
        message: "Username is available to use"
    });
});
app.post("/email_validity", main_controller_1.default.check_email_validity, (req, res) => {
    return res.status(200).json({
        message: "Email is available to use"
    });
});
app.post("/register", [main_controller_1.default.check_usn_validity, main_controller_1.default.check_email_validity, upload.fields([{name: "avatar", maxCount: 1}, {name: "cover", maxCount: 1}]),main_controller_1.default.register], (req, res) => {
    return res.status(200).json({
        message: "New user signed up successfully"
    });
});
app.post("/login", main_controller_1.default.login, (req, res) => {
    const token = jsonwebtoken_1.default.sign({ username: req.username, role: req.role }, process.env.SECRET_KEY);
    return res
        .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });
});
app.get("/logout", main_controller_1.default.authorization, (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
});
app.post("/new_album", [uploadAlbum.single("image"), main_controller_1.default.createAlbum], (req, res) => {
    return res.status(200).json({
        message: "Your album is added sucessfully"
    });
})
app.get("/album_trending", main_controller_1.default.getAlbumTrending, (req, res) => {
    return res.status(200).json(req.album);
});
app.get("/album_user", [main_controller_1.default.authorization, main_controller_1.default.getAlbumUser], (req, res) => {
    return res.status(200).json(req.album);
});
app.get("/album_favorite", [main_controller_1.default.authorization, main_controller_1.default.getAlbumFavorite], (req, res) => {
    return res.status(200).json(req.album);
});
app.get("/get_comment", [main_controller_1.default.authorization, main_controller_1.default.getComment], (req, res) => {
    return res.status(200).json(req.comment);
});
app.post("/add_comment", [main_controller_1.default.authorization, main_controller_1.default.addComment], (req, res) => {
    return res.status(200).json({
        message: "Your comment is added sucessfully"
    });
});
app.get("/get_reply", [main_controller_1.default.authorization, main_controller_1.default.getReply], (req, res) => {
    return res.status(200).json(req.comment);
});
app.post("/reply_to", [main_controller_1.default.authorization, main_controller_1.default.replyTo], (req, res) => {
    return res.status(200).json({
        message: "Your reply is added sucessfully"
    });
});
app.post("/react_album", [main_controller_1.default.ReactAlbum], (req, res) => {
    return res.status(200).json({
        message: "You have reacted to an album"
    });
});
app.post("/react_comment", [main_controller_1.default.ReactComment], (req, res) => {
    return res.status(200).json({
        message: "You have reacted to a comment"
    });
});
app.get("/get_followers", [main_controller_1.default.authorization, main_controller_1.default.getFollower], (req, res) => {
    return res.status(200).json(req.follower);
});
app.get("/get_following", [main_controller_1.default.authorization, main_controller_1.default.getFollowing], (req, res) => {
    return res.status(200).json(req.following);
});
app.post("/follow", main_controller_1.default.Follow, (req, res) => {
    return res.status(200).json({
        message: "You have followed a person"
    });
});
app.post("/unfollow", main_controller_1.default.unFollow, (req, res) => {
    return res.status(200).json({
        message: "You have unfollowed a person"
    });
});
app.get("/get_connection", [main_controller_1.default.authorization, main_controller_1.default.getConnection], (req, res) => {
    return res.status(200).json(req.friend);
});
app.post("/send_friend_request", main_controller_1.default.sendRequestFriend, (req, res) => {
    return res.status(200).json({
        message: "You have sent a friend request to a person"
    });
});
app.post("/answer_friend_request", main_controller_1.default.answerRequestFriend, (req, res) => {
    return res.status(200).json({
        message: "You have answered a friend request"
    });
});
app.get("/get_friends", [main_controller_1.default.authorization, main_controller_1.default.getFriends], (req, res) => {
    return res.status(200).json(req.friend);
});
app.post("/unfriend", main_controller_1.default.unFriend, (req, res) => {
    return res.status(200).json({
        message: "You have unfriended a person"
    });
});
const start = () => {
    let port = process.env.PORT;
    try {
        app.listen(port, () => {
            console.log(`Api up and running at: http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error(error);
        process.exit();
    }
};
start();
