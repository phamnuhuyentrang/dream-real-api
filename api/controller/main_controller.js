"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Controller for Authentication - User
const register_1 = __importDefault(require("./auth/register"));
const login_1 = __importDefault(require("./auth/login"));
const authorisation_1 = __importDefault(require("./token/authorisation"));
const check_usn_validity_1 = __importDefault(require("./auth/check_usn_validity"));
const check_email_validity_1 = __importDefault(require("./auth/check_email_validity"));
// 2. Controller for Album
const get_album_trendings_1 = __importDefault(require("./album/get_album_trendings"));
const get_album_user_1 = __importDefault(require("./album/get_album_user"));
const get_album_favorite_1 = __importDefault(require("./album/get_album_favorite"));
const add_album_1 = __importDefault(require("./album/add_album"));
const filter_album_by_friend_1 = __importDefault(require("./album/filter_album_by_friend"))
const filter_album_by_following_1 = __importDefault(require("./album/filter_album_by_following"))
const all_tags_1 = __importDefault(require("./album/tags/all_tags"))
// 3. Controller for Comment
const get_comment_1 = __importDefault(require("./album/comment/get_comment"));
const add_comment_1 = __importDefault(require("./album/comment/add_comment"));
const get_reply_1 = __importDefault(require("./album/comment/get_reply"));
const reply_to_1 = __importDefault(require("./album/comment/reply_to"));
// 4. Controller for Reaction
const react_to_album_1 = __importDefault(require("./album/reaction/react_to_album"));
const react_to_comment_1 = __importDefault(require("./album/reaction/react_to_comment"));
// 5. Controller for Follows
const get_follower_1 = __importDefault(require("./user/get_follower"));
const get_following_1 = __importDefault(require("./user/get_following"));
const follow_1 = __importDefault(require("./user/follow"));
const unfollow_1 = __importDefault(require("./user/unfollow"));
const get_admin_1 = __importDefault(require("./user/get_admin"));
// 6. Controller for Friends
const get_connection_1 = __importDefault(require("./user/get_connection"));
const send_request_friend_1 = __importDefault(require("./user/send_request_friend"));
const answer_request_friend_1 = __importDefault(require("./user/answer_request_friend"));
const get_friend_1 = __importDefault(require("./user/get_friend"));
const unfriend_1 = __importDefault(require("./user/unfriend"));
// 7. Controller for Destinations
const get_destination = __importDefault(require("./destination/get_destination"));
exports.default = { register: register_1.default, login: login_1.default, authorization: authorisation_1.default, check_usn_validity: check_usn_validity_1.default, check_email_validity: check_email_validity_1.default, getAlbumUser: get_album_user_1.default, getAlbumTrending: get_album_trendings_1.default, createAlbum: add_album_1.default, getComment: get_comment_1.default, addComment: add_comment_1.default, getReply: get_reply_1.default, replyTo: reply_to_1.default, ReactAlbum: react_to_album_1.default, ReactComment: react_to_comment_1.default, getAlbumFavorite: get_album_favorite_1.default, getFollower: get_follower_1.default, getFollowing: get_following_1.default, Follow: follow_1.default, unFollow: unfollow_1.default, getConnection: get_connection_1.default, sendRequestFriend: send_request_friend_1.default, answerRequestFriend: answer_request_friend_1.default, getFriends: get_friend_1.default, unFriend: unfriend_1.default, getDestination: get_destination.default, filterAlbumByFriend: filter_album_by_friend_1.default, filterAlbumByFollowing: filter_album_by_following_1.default, getAdmin: get_admin_1.default, getTag: all_tags_1.default };
