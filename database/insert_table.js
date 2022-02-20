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
class InsertTable extends connector_1.default {
    constructor() {
        super();
        this.user_data = [
            [1, 'milsavic', 'Milos', 'Savic #1', 'milos@mail.me', 'crUfRuavtql8e/aGlf1ioJRQZA5IcvpSfUk1J/+ZJxfu/h0Dlziozrgxp0Ue7OYACr0wYVQsfd+atTl/9nKJ/A==', 'avatar/avatar1.jpg', 'cover/default.jpg', 136, 'admin', '2017-01-07 17:39:00', '2021-03-03 00:17:22', 4],
            [2, 'savsavic', 'Sava', 'Savic #2', 'sava@mail.me', '+S+dbwIC5RoHA8OV6v/Ah2z/MCdLRKGSmPvjLhAvFib1o1Gv2ADnUq6KZqE4geb8u3lK4/lQpsgFA5tWSbfM/g==', 'avatar/avatar2.jpg', 'cover/default.jpg', 0, 'user', '2017-01-07 17:40:00', '2021-01-23 09:39:20', 10],
            [3, 'fabkoepp', 'Fabiola', 'Koepp', 'reinger.garrick@hotmail.com', 'KBtyZEU00OIyAYi2XsHMpKtfirWqEUHc/2AC94pgShJNUg8DbAKjvJ8YTFseIKxwWUjUo3dDeOSrJvniePuaCw==', 'avatar/selfie12.jpg', 'cover/default.jpg', 0, 'user', '2021-01-22 02:12:54', '2021-01-22 02:12:54', 11],
            [4, 'mdubuque', 'Mireille', 'DuBuque', 'spencer.elton@gmail.com', '00qbkkdXDxYMZLjhH5jTH/rkrQj1mkbeRZTlr5O9MlQMWo/V4DyWAQx35JHedN6s1pAzcKf1Xj+JuhxBBg4OIQ==', 'avatar/selfie6.jpg', 'cover/default.jpg', 0, 'user', '2020-05-09 04:23:12', '2020-05-09 04:23:12', 13],
            [5, 'netdicki', 'Nettie', 'Dicki', 'osbaldo.farrell@gmail.com', 'PHknQ2Sc+mP7r1PgzCiyt65GDRi5Fmrgij5F00e7FN2r5MbBloPi++jPv4lARlPRPrP177r+T7GfjjYJ0WCzIQ==', 'avatar/selfie5.jpg', 'cover/default.jpg', 0, 'user', '2021-01-11 23:39:39', '2021-01-11 23:39:39', 15],
            [6, 'michyatt', 'Michele', 'Hyatt', 'marvin.elta@gmail.com', 'z1B4LKHi17vE41dKQ3cS0DqeryYxHSBL8YIITa+lLLkzIz3RTlfqM0tfH6SEtHw5GxP+XUuIMKb90y2nnRpMMQ==', 'avatar/selfie7.jpg', 'cover/default.jpg', 0, 'user', '2020-10-15 02:31:09', '2020-10-15 02:31:09', 19],
            [7, 'dschaefe', 'Dayana', 'Schaefer', 'lilian02@mccullough.biz', 'eYTlQl671xgW+2Su74fFokpJP6NZDzbC/+24looEvEk87zwTIQz+QY5RvnBSLpCb1CN+DBWtqmi6aizoDuuLxw==', 'avatar/selfie8.jpg', 'cover/default.jpg', 0, 'user', '2020-10-19 05:12:51', '2020-10-19 05:12:51', 1],
            [8, 'gilolson', 'Gilbert', 'Olson', 'bfarrell@mayer.com', 'spJ6/Tl6LOaDu2WK2l2w+NOVWmhg/UwaFtddNoKQo6Mu5WX4oYP1eJ7pOLXcAn8d0Iwb7bpq0ARawrQWX9JOyA==', 'avatar/selfie4.jpg', 'cover/default.jpg', 0, 'user', '2020-12-28 21:15:17', '2021-02-06 10:08:58', 3],
            [9, 'reynolds', 'Florencio', 'Reynolds', 'elockman@balistreri.com', 'wHlYlDebFke7T5iJjAGSqBW/Mq/9PNikZ+OdicN0ZwmF+PY+u4JP3812qVNadK01GUTi/0QFXGRtySfj6qA/oA==', 'avatar/selfie9.jpg', 'cover/default.jpg', 0, 'user', '2020-06-16 05:49:04', '2020-06-16 05:49:04', 6],
            [10, 'schmeler', 'Milton', 'Schmeler', 'aschuster@yahoo.com', 'MzwBfOviCWGAoWeG9b+1NYLrHw7dlZR46HbdlHd/wUbXhsX0kA+QeyEuZoptV2iFPsu3GEgtjtoUaJKbcZeHeg==', 'avatar/avatar3.jpeg', 'cover/default.jpg', 0, 'user', '2020-01-26 04:42:50', '2021-02-19 06:54:31', 8],
            [11, 'schaefer', 'Vernie', 'Schaefer', 'mable79@yahoo.com', 'cEhxHtRQ1kF4NVtt/OMXaKzGxPbr/LUXZr7PzZ7SgzY+ADLaNFKHsDRzjsYiZriy1+Jh6fosSZBe2ICwb488MA==', 'avatar/selfie10.jpg', 'cover/default.jpg', 0, 'user', '2020-10-26 02:00:16', '2020-10-26 02:00:16', 7],
            [12, 'gewalter', 'Georgina', 'Walter', 'stokes.virginia@gaylord.com', 'GZH7XcKDloOL26AYKxQVUDqNW17/w1wkkQanJiU/l90Bq7nrddGYVQfbtUXGkIwnRyfLGoX9KZbELHunVx4Dsw==', 'avatar/selfie14.jpg', 'cover/default.jpg', 0, 'user', '2020-04-25 23:11:06', '2020-04-25 23:11:06', 9],
            [13, 'stojkovi', 'Srđan', 'Stojković', 'marsmedia1@yahoo.com', '5O5d8rSTbgFGwaaC+VLavJ4W9Hyus5FYV4qj+y7+qNHrcVwW8W0Ri/kB7b5VhzA03TxzRlk0TgAYw+dbW2x0lQ==', 'avatar/selfie13.jpg', 'cover/default.jpg', 2, 'user', '2021-03-03 06:31:29', '2021-03-03 06:32:50', 2]
        ];
        this.album_data = [
            [1, '2020-08-11 12:37:38', '2020-08-11 12:37:38', 'Dicta id maxime est saepe facilis qui recusandae. Et rerum pariatur et sit asperiores ut iste. Facilis in autem consequatur nisi facilis ut est. Veniam officiis inventore ratione magnam non.', 5, 7, 1, 0, 1133, "album/milsavic/drink_beer.jpg"],
            [2, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed. Perferendis sed numquam aliquam dolor ipsa qui.', 9, 1, 11, 0, 155, "album/schaefer/ao_dai_tet.jpeg"],
            [3, '2020-05-10 16:13:06', '2020-05-10 16:13:06', 'Earum aut vero aut provident iste. Incidunt autem recusandae omnis. Dignissimos ut incidunt ipsam porro nobis. Labore non soluta iusto repellat non ea porro.', 5, 2, 10, 0, 538, "album/schmeler/coffee_with_friends.jpeg"],
            [4, '2020-11-09 07:35:48', '2020-11-09 07:35:48', 'Enim officiis qui excepturi incidunt perspiciatis veritatis rem. Voluptate ratione dignissimos quia. Qui unde quia fugiat et tempore. Eligendi eligendi nesciunt tempora laborum sequi maiores.', 6, 10, 1, 0, 85, "album/milsavic/eating_pizza.jpg"],
            [5, '2020-09-14 22:23:34', '2020-09-14 22:23:34', 'Aspernatur ea dolor aliquid mollitia suscipit cupiditate dolores. Dolor at consequatur eaque impedit ipsum unde reprehenderit.', 2, 7, 10, 0, 161, "album/schmeler/drink_beer.jpg"],
            [6, '2020-01-27 18:46:12', '2020-01-27 18:46:12', 'Eaque quaerat expedita nobis voluptates molestias unde vero facere. Consequatur unde ullam vel. Ea nisi voluptates accusamus fugit.', 7, 1, 8, 0, 189, "album/gilolson/travel_to_vietnam.jpg"],
            [7, '2020-03-10 00:57:24', '2020-03-10 00:57:24', 'Quia sed aut et sed. Quo expedita in nemo nulla quibusdam et. Iste cumque est quia doloremque debitis. Dolorum ut ab sequi enim nisi dolores. Aut excepturi alias aut atque. Labore at quo ut.', 4, 9, 5, 1, 1081, "album/netdicki/water_surf.jpeg"],
            [8, '2020-06-14 15:21:03', '2020-06-14 15:21:03', 'Modi corporis illum tenetur corporis accusantium non quod qui. Dolores a iusto voluptas ratione quas id consequatur. Quia sed maxime nihil impedit explicabo.', 1, 10, 9, 1, 874, "album/reynolds/kimono.jpeg"],
            [9, '2020-07-15 15:39:53', '2020-07-15 15:39:53', 'Ratione aut et amet similique voluptatibus. Atque ab aliquam itaque et vitae omnis non. Molestiae voluptatem nihil eius hic at necessitatibus in.', 9, 2, 9, 1, 506, "album/reynolds/relax_egypt.jpeg"],
            [10, '2020-10-04 19:45:01', '2020-10-04 19:45:01', 'Expedita sequi eaque est praesentium aut. Eos molestiae nihil autem sit. Ipsam necessitatibus expedita officia tempora.', 2, 6, 7, 0, 539, "album/dschaefe/relax_egypt.jpeg"],
            [11, '2020-09-09 06:18:00', '2020-09-09 06:18:00', 'Possimus sit aut repellendus molestiae molestias earum. Qui nostrum iusto quia qui aperiam iste. Alias rerum dolorum non eaque. Sed quia ratione expedita modi quia.', 5, 1, 12, 1, 894, "album/gewalter/travel-world.jpeg"],
            [12, '2020-10-26 01:13:45', '2021-02-19 06:54:31', 'Voluptas aut consequuntur unde sequi. Facilis qui minima occaecati harum. Explicabo consequatur perspiciatis recusandae qui eaque eaque. Quod adipisci iure mollitia molestiae nostrum.', 7, 12, 10, 1, 18, "album/schmeler/eating_pizza.jpg"],
            [13, '2020-08-27 06:44:20', '2020-08-27 06:44:20', 'Vitae dolorum omnis quibusdam aliquid quisquam est. Similique amet vel totam neque voluptates dignissimos modi. Quia officiis deserunt mollitia dicta similique amet.', 2, 4, 1, 0, 55, "album/milsavic/boat.jpeg"],
            [14, '2021-01-18 04:14:31', '2021-01-18 04:14:31', 'Veritatis doloremque eos amet voluptatibus incidunt labore. Consequatur deserunt porro delectus minus quasi et. Voluptatem quibusdam nam quidem sequi quaerat consequatur.', 4, 10, 11, 0, 747, "album/schaefer/kimono.jpeg"],
            [15, '2020-10-05 20:32:49', '2020-10-05 20:32:49', 'Officia et ut necessitatibus. Ut est at qui voluptas cumque nisi ut recusandae. Est unde quam odio minima. Harum sed delectus velit est aliquam quam suscipit laudantium.', 1, 6, 7, 1, 1012, "album/dschaefe/skating.jpg"],
            [16, '2020-11-26 04:52:36', '2020-11-26 04:52:36', 'Beatae corrupti ut explicabo dignissimos asperiores laborum harum quae. Doloribus vel omnis nihil dolores asperiores. Iste dolores fugit quidem consequatur dolorem eum.', 6, 1, 6, 0, 528, "album/michyatt/ao_dai_tet.jpeg"],
            [17, '2020-07-02 06:35:00', '2020-07-02 06:35:00', 'Exercitationem facilis ea id. Sint ut vero temporibus voluptatem. Non ea veritatis commodi.', 3, 3, 13, 1, 817, "album/stojkovi/thien.jpg"],
            [18, '2020-10-22 10:49:07', '2020-10-22 10:49:07', 'Autem eos error numquam quisquam vero totam dolor corrupti. Ipsum quam et doloribus fugit et rem. Autem iste cum aut omnis totam ab.', 8, 5, 5, 1, 368, "album/netdicki/watching_tv.jpeg"],
            [19, '2020-10-13 17:52:12', '2020-10-13 17:52:12', 'Aut natus nostrum ipsa odit architecto illo. Eligendi recusandae amet neque ipsam velit explicabo totam quisquam. Quo voluptas sed qui magnam eum.', 6, 12, 4, 0, 221, "album/mdubuque/travel.jpg"],
            [20, '2021-01-03 03:36:10', '2021-01-03 03:36:10', 'Delectus sint placeat est sunt. Placeat autem qui qui doloribus aut voluptas qui. Qui qui praesentium aliquam ut perferendis ea. Molestiae rerum ullam libero assumenda.', 1, 7, 7, 1, 1007, "album/dschaefe/thien.jpg"],
            [21, '2020-11-30 16:28:03', '2020-11-30 16:28:03', 'Porro suscipit aliquid libero. Porro similique impedit dolore est qui. Sapiente accusantium laboriosam nam ut molestiae aliquid repudiandae.', 9, 7, 1, 0, 401, "album/milsavic/looking_for_job.jpg"],
            [22, '2020-01-24 14:29:36', '2020-01-24 14:29:36', 'Veritatis nemo quos et similique quia. Harum quia praesentium id nulla est.', 6, 5, 6, 1, 484, "album/michyatt/boat.jpeg"],
            [23, '2020-07-11 19:39:43', '2020-07-11 19:39:43', 'Dolore est excepturi dolores. Quaerat sequi quia commodi omnis.', 2, 11, 3, 0, 619, "album/fabkoepp/kimono.jpeg"],
            [24, '2020-02-03 04:16:12', '2021-02-06 10:08:58', 'Et voluptatibus soluta est. Facere nihil cum ipsam odit. Facere eveniet non ab voluptatem non. Quibusdam accusantium delectus iusto id ducimus necessitatibus quis.', 7, 11, 8, 1, 376, "album/gilolson/water_surf.jpeg"],
            [25, '2020-02-12 10:38:50', '2020-02-12 10:38:50', 'Porro est ratione maxime quam. Dolor enim dolorem aliquam magnam ea aperiam quas. Ut laudantium porro quia doloremque nihil qui illum.', 2, 11, 1, 0, 718, "album/milsavic/relax_egypt.jpeg"],
            [26, '2020-11-08 19:13:03', '2020-11-08 19:13:03', 'Nemo illum explicabo neque rerum eos cupiditate voluptatem. Ut ut nisi voluptatem cupiditate dolores deserunt quas velit. Voluptas temporibus ad voluptate omnis.', 5, 4, 7, 1, 225, "album/dschaefe/tour_egypt.jpeg"],
            [27, '2020-08-20 18:54:11', '2020-08-20 18:54:11', 'Minima quis quis suscipit dolorum quos ipsam. Fugiat dolor laudantium et molestias. Sed non voluptas et saepe illo quisquam.', 2, 9, 9, 0, 9, "album/reynolds/tour_egypt.jpeg"],
            [28, '2021-01-13 23:47:48', '2021-02-16 07:21:54', 'Voluptas dicta eaque iusto corrupti. Et exercitationem facere praesentium voluptatem sed maiores. Maxime laboriosam consequuntur omnis. Hic accusamus et velit consectetur hic minima illo.', 4, 2, 10, 1, 888, "album/schmeler/eating.jpeg"],
            [29, '2020-03-13 00:55:29', '2020-03-13 00:55:29', 'Porro magnam eligendi non sapiente et. Autem voluptatibus iusto nulla harum rerum minus voluptas qui. Non alias maiores sequi ea quia. Neque aut aut consequuntur culpa vitae necessitatibus.', 10, 11, 1, 0, 729, "album/milsavic/skating.jpg"],
            [30, '2020-04-21 15:43:55', '2020-04-21 15:43:55', 'Sint et illo in dignissimos impedit eligendi est. Incidunt sed dolores qui impedit veniam. Earum neque suscipit ut sit suscipit nihil qui.', 4, 8, 3, 0, 1041, "album/fabkoepp/coffee_with_friends.jpeg"],
            [31, '2021-02-15 15:07:11', '2021-02-15 15:10:05', 'test', 1, null, 2, 0, null, "album/savsavic/coffee_with_friends.jpeg"],
            [32, '2021-02-17 12:36:43', '2021-02-19 06:54:20', '', 12, 5, 1, 0, 5, "album/milsavic/watching_tv.jpeg"],
            [33, '2021-02-19 06:48:13', '2021-02-19 07:17:47', 'Summer', 12, 1, 4, 0, 1, "album/mdubuque/travel-world.jpeg"],
            [34, '2021-02-19 06:49:35', '2021-03-03 00:08:40', 'MARVELOUS! ', 13, 1, 3, 0, 1, "album/fabkoepp/ao_dai_tet.jpeg"],
            [35, '2021-02-19 06:50:52', '2021-03-03 00:08:17', 'Chillin in San Francisco some years ago ', 14, 3, 2, 0, 3665, "album/savsavic/eating.jpeg"],
            [36, '2021-02-19 06:53:10', '2021-02-24 15:27:31', 'A hot day in Italy', 16, 2, 2, 0, 2, "album/savsavic/tour_egypt.jpeg"]
        ];
        this.geo_data = [
            [1, '2021-01-23 07:05:29', '2021-01-23 07:05:29', '27.01', '75.11', 'Nawa', 'Rajasthan', 'India', 'IND', 'Nawa, Rajasthan, India', 'ChIJa5PPA814bDkRlEXD_5YXZXo', null, 1],
            [2, '2021-01-23 07:05:29', '2021-01-23 07:05:29', '51.6312588', '0.235789', 'Brentwood', '', 'United Kingdom', 'GBR', 'Brentwood, United Kingdom', 'ChIJwfYXm_CV2EcRWSrpWWVgh4U', null, 1],
            [3, '2021-01-23 07:05:29', '2021-01-23 07:05:29', '47.8915649', '106.7617875', 'Улаанбаатар', '', 'Mongolia', 'MNG', 'Улаанбаатар, Mongolia', 'ChIJq4qx4luSll0Rf4ShZHiSBuY', null, 1],
            [4, '2021-01-23 07:05:29', '2021-01-23 07:05:29', '48.67', '-89.97', 'Thunder Bay', 'ON', 'Canada', 'CAN', 'Thunder Bay, ON, Canada', 'ChIJjekWTHchWU0RdIsdjzRXBT0', null, 1],
            [5, '2021-01-23 07:05:30', '2021-01-23 07:05:30', '23.82', '99.09', 'Lincang', 'Yunnan', 'China', 'CHN', 'Lincang, Yunnan, China', 'ChIJK-oV1OpoKTcR9Mx4bR3iPdc', null, 1],
            [6, '2021-01-23 07:05:30', '2021-01-23 07:05:30', '35.78', '94.93', 'Qinghai', 'Qinghai', 'China', 'CHN', 'Qinghai, China', 'ChIJ7Qtie5eHADcRv523fabL7Sg', null, 1],
            [7, '2021-01-23 07:05:30', '2021-01-23 07:05:30', '46.3168702', '0.1425433', 'Valence-en-Poitou', 'Nouvelle-Aquitaine', 'France', 'FRA', 'Valence-en-Poitou, Nouvelle-Acquitaine, France', 'ChIJW85Ia17k_UcRuK-zp_5wFNI', null, 1],
            [8, '2021-01-23 07:05:30', '2021-01-23 07:05:30', '32.87', '93.63', 'Zadoi County Yushu Zangzu Autonomous Prefecture Qinghai', 'Qinghai', 'China', 'CHN', 'Zadoi County Yushu Zangzu Autonomous Prefecture Qinghai, Qinghai, China', 'ChIJGauAX16uDDcRTZlKp1Vidko', null, 1],
            [9, '2021-01-23 07:05:31', '2021-01-23 07:05:31', '29.1', '81.1', 'Dhangarhi', 'Seti', 'Nepal', 'NPL', 'Dhangarhi, Seti', 'ChIJN8xC-w_toTkRHLEkp3CU6H8', null, 1],
            [10, '2021-01-23 07:05:31', '2021-01-23 07:05:31', '38.8228215', '-108.0393602', 'Orchard City', 'Colorado', 'United States', 'USA', 'Orchard City, Delta County, Colorado, United States', 'ChIJY_QVNv6zQIcRoABln8j27GA', null, 1],
            [11, '2021-01-31 12:11:58', '2021-02-19 06:51:03', '41.387916564941406', '2.169919013977051', 'Barcelona', 'Catalonia', 'Spain', 'ESP', 'Barcelona, Catalonia, Spain', 'ChIJ5TCOcRaYpBIRCmZHTz37sEQ', null, 1],
            [12, '2021-02-13 13:24:14', '2021-02-19 06:48:19', '48.856895446777344', '2.350848913192749', 'Paris', 'Île-de-France', 'France', 'FRA', 'Paris, Île-de-France, France', 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ', null, 2],
            [13, '2021-02-19 06:49:35', '2021-02-19 06:51:06', '39.56945037841797', '2.6499459743499756', 'Palma', 'Balearic Islands', 'Spain', 'ESP', 'Palma, Balearic Islands, Spain', 'ChIJV8caxlmSlxIRxljQwwZUDcQ', null, 2],
            [14, '2021-02-19 06:50:52', '2021-02-19 06:50:56', '37.78007888793945', '-122.42015838623047', 'San Francisco', 'CA', 'United States', 'USA', 'San Francisco, CA, United States', 'ChIJIQBpAG2ahYAR_6128GcTUEo', null, 2],
            [15, '2021-02-19 06:53:10', '2021-02-19 06:53:10', '43.047943115234375', '-76.14744567871094', 'Syracuse', 'NY', 'United States', 'USA', 'Syracuse, NY, United States', 'ChIJDZqXv5vz2YkRRZWt1-IM1QA', null, 1],
            [16, '2021-02-19 07:06:05', '2021-02-19 07:06:23', '37.06616973876953', '15.284257888793945', 'Syracuse', '', 'Italy', 'ITA', 'Syracuse, Italy', 'ChIJTewPt0DVExMR8IK2ZykECwM', null, 2],
            [17, '2021-02-21 20:23:57', '2021-02-21 20:23:57', '-33.847927', '150.6517824', 'Sydney', '', 'Australia', 'AUS', 'Sydney, Australia', 'ChIJP3Sa8ziYEmsRUKgyFmh9AQM', null, 1],
            [18, '2021-02-25 09:51:16', '2021-02-25 09:51:16', '38.7436057', '-9.2302435', 'Lisbon', '', 'Portugal', 'PRT', 'Lisbon, Portugal', 'ChIJO_PkYRozGQ0R0DaQ5L3rAAQ', null, 1],
            [19, '2021-03-01 13:11:48', '2021-03-01 13:11:48', '-44.9968245', '168.6297588', 'Queenstown', '', 'New Zealand', 'NZL', 'Queenstown, New Zealand', 'ChIJX96o1_Ed1akRAKZ5hIbvAAU', null, 1]
        ];
        this.comment_data = [
            [1, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 1, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [2, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 1, 1, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', 1],
            [3, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 3, 1, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [4, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 4, 1, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [5, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 5, 1, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [6, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 6, 1, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [7, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 7, 1, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', 3],
            [8, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 1, 2, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [9, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 2, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [10, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 3, 2, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [11, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 4, 2, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', 10],
            [12, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 5, 2, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [13, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 6, 2, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [14, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 7, 2, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [15, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 8, 2, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [16, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 2, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [17, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 3, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [18, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 3, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [19, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 3, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [20, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 3, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [21, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 3, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [22, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 3, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [23, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 3, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [24, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 3, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [25, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 4, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [26, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 4, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [27, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 4, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [28, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 4, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [29, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 4, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [30, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 2, 4, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', null],
            [31, '2020-02-09 03:45:14', '2020-02-09 03:45:14', 5, 4, 'Quia maxime quo ut sequi aut est sit aut. Molestias omnis cum aut minima molestias distinctio. Et iusto facilis magnam est sed', 2]
        ];
        this.tag_data = [
            [1, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '😊 Feeling', 'feeling'],
            [2, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '🍕 Eating', 'eating'],
            [3, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '🍷 Drinking', 'drinking'],
            [4, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '🚗Traveling to', 'traveling-to'],
            [5, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '🔍 Looking for', 'looking-for'],
            [6, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '🎈 Celebrating', 'celebrating'],
            [7, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '🖐 Meeting', 'meeting'],
            [8, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '😊 Getting', 'getting'],
            [9, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '📐 Making', 'making'],
            [10, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '🤔 Thinking About', 'thinking-about'],
            [11, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '📕 Remembering', 'remembering'],
            [12, '2021-01-23 07:05:27', '2021-01-23 07:05:27', '💛 Custom', 'custom']
        ];
        this.follow_data = [
            [1, 1, 2],
            [2, 2, 1],
            [3, 1, 3],
            [4, 1, 4],
            [5, 1, 10],
            [6, 2, 3],
            [7, 2, 11]
        ];
        this.react_data = [
            [1, '2021-01-23 07:05:27', '2021-01-23 07:05:27', 2, 1, null, 1],
            [2, '2021-01-23 07:05:27', '2021-01-23 07:05:27', 1, 3, null, 2],
            [3, '2021-01-23 07:05:27', '2021-01-23 07:05:27', 1, null, 1, 2],
            [4, '2021-01-23 07:05:27', '2021-01-23 07:05:27', 3, null, 3, 3],
            [5, '2021-01-23 07:05:27', '2021-01-23 07:05:27', 4, null, 2, 4],
            [6, '2021-01-23 07:05:27', '2021-01-23 07:05:27', 5, 4, null, 5],
            [7, '2021-01-23 07:05:27', '2021-01-23 07:05:27', 6, null, 1, 1],
        ];
        this.favorite_data = [
            [1, 1, 2],
            [2, 1, 3],
            [3, 1, 5],
            [4, 1, 6],
            [5, 1, 8],
            [6, 1, 9],
            [7, 1, 10],
            [8, 2, 2],
            [9, 2, 4],
            [10, 2, 1],
            [11, 2, 13],
            [12, 3, 2],
            [13, 3, 4],
            [14, 3, 3],
            [15, 3, 7],
            [16, 3, 9],
            [17, 6, 1],
            [18, 6, 2],
            [19, 6, 3],
            [20, 6, 4],
            [21, 6, 5],
            [22, 7, 6],
            [23, 7, 7],
            [24, 8, 8],
            [25, 8, 9],
            [26, 8, 10],
            [27, 10, 5],
            [28, 10, 7],
        ];
        this.friend_data = [
            [1, 6, 9, 'pending'],
            [2, 12, 8, 'accepted'],
            [3, 4, 9, 'accepted'],
            [4, 8, 13, 'accepted'],
            [5, 1, 2, 'accepted'],
            [6, 13, 9, 'accepted'],
            [7, 11, 10, 'accepted'],
            [8, 7, 9, 'accepted'],
            [9, 7, 4, 'accepted'],
            [10, 12, 7, 'accepted'],
            [11, 12, 3, 'accepted'],
            [12, 13, 7, 'accepted'],
            [13, 8, 3, 'accepted'],
            [14, 2, 13, 'accepted'],
            [15, 9, 12, 'accepted'],
            [16, 10, 7, 'accepted'],
            [17, 2, 10, 'accepted'],
            [18, 5, 9, 'accepted'],
            [19, 4, 8, 'accepted'],
            [20, 8, 5, 'accepted'],
            [21, 2, 8, 'accepted'],
            [22, 1, 7, 'accepted'],
            [23, 3, 10, 'accepted'],
            [24, 6, 12, 'accepted'],
            [25, 4, 13, 'accepted'],
            [26, 5, 2, 'accepted'],
            [27, 1, 8, 'accepted'],
            [28, 1, 10, 'accepted']
        ];
    }
    insertTable() {
        this.insertTableUser(this.user_data);
        this.insertTableAlbum(this.album_data);
        this.insertTableComment(this.comment_data);
        this.insertTableFollow(this.follow_data);
        this.insertTableGeo(this.geo_data);
        this.insertTableReact(this.react_data);
        this.insertTableTag(this.tag_data);
        this.insertTableFavorite(this.favorite_data);
        this.insertTableFriend(this.friend_data);
    }
    insertTableFavorite(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO favorite (id, user_id, album_id) VALUES ?";
            const connection = this.db;
            this.db.query(sql, [data], function (err) {
                if (err) {
                    // connection.rollback(function() {
                    // })
                    throw err;
                }
                else {
                    // connection.commit()
                    console.log("Insert into user done");
                }
            });
        });
    }
    insertTableFriend(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO friend (id, user_id, friend_id, status) VALUES ?";
            const connection = this.db;
            this.db.query(sql, [data], function (err) {
                if (err) {
                    // connection.rollback(function() {
                    // })
                    throw err;
                }
                else {
                    // connection.commit()
                    console.log("Insert into user done");
                }
            });
        });
    }
    insertTableUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO user (id, username, first_name, last_name, email, password, avatar, cover_image, comm_score, role, created_at, updated_at, geo_id) VALUES ?";
            const connection = this.db;
            this.db.query(sql, [data], function (err) {
                if (err) {
                    // connection.rollback(function() {
                    // })
                    throw err;
                }
                else {
                    // connection.commit()
                    console.log("Insert into user done");
                }
            });
        });
    }
    insertTableAlbum(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO album (id, created_at, updated_at, description, geo_id, tag_id, user_id, dream_real, score, image) VALUES ?";
            const connection = this.db;
            this.db.query(sql, [data], function (err) {
                if (err) {
                    // connection.rollback(function() {
                    // })
                    throw err;
                }
                else {
                    // connection.commit()
                    console.log("Insert into album done");
                }
            });
        });
    }
    insertTableGeo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO geo (id, created_at, updated_at, latitude, longitude, location_city, location_state, location_country, location_country_iso, location_formatted, hash, image, status) VALUES ?";
            const connection = this.db;
            this.db.query(sql, [data], function (err) {
                if (err) {
                    // connection.rollback(function() {
                    // })
                    throw err;
                }
                else {
                    // connection.commit()
                    console.log("Insert into geo done");
                }
            });
        });
    }
    insertTableComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO comment (id, created_at, updated_at, user_id, album_id, context, reply_to) VALUES ?";
            const connection = this.db;
            this.db.query(sql, [data], function (err) {
                if (err) {
                    // connection.rollback(function() {
                    // })
                    throw err;
                }
                else {
                    // connection.commit()
                    console.log("Insert into comment done");
                }
            });
        });
    }
    insertTableTag(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO tag (id, created_at, updated_at, title, slug) VALUES ?";
            const connection = this.db;
            this.db.query(sql, [data], function (err) {
                if (err) {
                    // connection.rollback(function() {
                    // })
                    throw err;
                }
                else {
                    // connection.commit()
                    console.log("Insert into tag done");
                }
            });
        });
    }
    insertTableFollow(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO follow (id, following_id, follower_id) VALUES ?";
            const connection = this.db;
            this.db.query(sql, [data], function (err) {
                if (err) {
                    // connection.rollback(function() {
                    // })
                    throw err;
                }
                else {
                    // connection.commit()
                    console.log("Insert into follow done");
                }
            });
        });
    }
    insertTableReact(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO react (id, created_at, updated_at, user_id, album_id, comment_id, emoji) VALUES ?";
            const connection = this.db;
            this.db.query(sql, [data], function (err) {
                if (err) {
                    // connection.rollback(function() {
                    // })
                    throw err;
                }
                else {
                    // connection.commit()
                    console.log("Insert into react done");
                }
            });
        });
    }
}
var insertData = new InsertTable();
insertData.insertTable();
