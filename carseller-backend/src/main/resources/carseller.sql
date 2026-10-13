-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Май 23 2025 г., 22:13
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `seller2`
--

-- --------------------------------------------------------

--
-- Структура таблицы `advertisement`
--

CREATE TABLE `advertisement` (
  `id` int(11) NOT NULL,
  `chassis_number` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(255) NOT NULL,
  `engine_cc` double NOT NULL,
  `engine_power` int(11) NOT NULL,
  `fuel_type` enum('BENZINE','DIESEL','HYBRID','LPG') NOT NULL,
  `gearbox` enum('AUTOMATIC','MANUAL','ROBOT','VARIATOR') NOT NULL,
  `mileage` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `sold_at` datetime(6) DEFAULT NULL,
  `status` enum('ARCHIVED','HIDDEN','PUBLISHED','SOLD') NOT NULL,
  `steering_placement` enum('LEFT','RIGHT') NOT NULL,
  `year` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `advertisement`
--

INSERT INTO `advertisement` (`id`, `chassis_number`, `color`, `created_at`, `description`, `engine_cc`, `engine_power`, `fuel_type`, `gearbox`, `mileage`, `price`, `sold_at`, `status`, `steering_placement`, `year`, `car_id`, `publisher_id`) VALUES
(2, 'AE950123J123KO', 'Красный', '2025-05-24 01:45:32.000000', 'Продам отличный авто, один владелец, все вопросы в лс', 1.6, 110, 'BENZINE', 'MANUAL', 320000, 400000, NULL, 'PUBLISHED', 'RIGHT', 1991, 8, 2),
(4, 'XTH1322ASKGW', 'Белый', '2025-05-23 00:57:32.000000', 'Пока на ходу\nНомер не продается', 2.4, 131, 'BENZINE', 'MANUAL', 400000, 105000, NULL, 'PUBLISHED', 'LEFT', 2003, 10, 4),
(5, 'S15031203012', 'Голубой', '2025-05-23 01:07:20.000000', 'Готовый шоукар', 2, 250, 'BENZINE', 'MANUAL', 120000, 2500000, NULL, 'PUBLISHED', 'RIGHT', 2000, 4, 4),
(6, 'AE95*********', 'Красный', '2025-05-08 01:33:34.000000', 'для статистики', 1.6, 100, 'BENZINE', 'MANUAL', 2, 250000, NULL, 'HIDDEN', 'RIGHT', 1991, 8, 1),
(7, 'AE950123J1231', 'Красный', '2025-04-01 01:33:52.000000', 'для статистики', 1.6, 100, 'BENZINE', 'MANUAL', 2, 250000, '2025-05-24 01:37:26.000000', 'ARCHIVED', 'RIGHT', 1991, 8, 1),
(8, 'AE950123J1231', 'Красный', '2025-05-11 01:34:14.000000', 'для статистики', 1.6, 100, 'BENZINE', 'MANUAL', 2, 600000, '2025-05-24 01:37:30.000000', 'ARCHIVED', 'RIGHT', 1991, 8, 1),
(9, 'AE950123J1231', 'Красный', '2025-03-03 01:34:16.000000', 'для статистики', 1.6, 100, 'BENZINE', 'MANUAL', 2, 60000, '2025-05-24 01:37:38.000000', 'ARCHIVED', 'RIGHT', 1991, 8, 1),
(10, 'AE950123J1231', 'Красный', '2024-11-04 01:34:20.000000', 'для статистики', 1.6, 100, 'BENZINE', 'MANUAL', 2, 120000, '2025-05-24 01:39:35.000000', 'ARCHIVED', 'RIGHT', 1991, 8, 1),
(11, 'AE950123J1231', 'Красный', '2025-05-01 01:34:23.000000', 'для статистики', 1.6, 100, 'BENZINE', 'MANUAL', 2, 50000, '2025-05-24 01:39:38.000000', 'ARCHIVED', 'RIGHT', 1991, 8, 1),
(12, 'AE950123J1231', 'Красный', '2024-08-01 01:34:26.000000', 'для статистики', 1.6, 100, 'BENZINE', 'MANUAL', 2, 250000, '2025-05-24 01:39:41.000000', 'ARCHIVED', 'RIGHT', 1991, 8, 1),
(13, 'AE950123J1231', 'Красный', '2025-03-01 01:34:29.000000', 'для статистики', 1.6, 100, 'BENZINE', 'MANUAL', 2, 300000, '2025-05-24 01:39:44.000000', 'ARCHIVED', 'RIGHT', 1991, 8, 1),
(14, 'AE950123J1231', 'Красный', '2025-04-22 01:34:32.000000', 'для статистики', 1.6, 100, 'BENZINE', 'MANUAL', 2, 350000, '2025-05-24 01:39:47.000000', 'ARCHIVED', 'RIGHT', 1991, 8, 1),
(15, 'AXV70123ASL32B', 'Белый', '2025-05-24 02:10:40.000000', 'Все вопросы в чат', 2.5, 180, 'BENZINE', 'AUTOMATIC', 110000, 3000000, '2025-05-24 02:11:39.000000', 'ARCHIVED', 'LEFT', 2020, 11, 3),
(16, 'TNT311290ASSAGAD', 'Сиреневый', '2025-05-24 02:22:40.000000', 'Продам авто', 3, 150, 'DIESEL', 'AUTOMATIC', 170000, 1200000, NULL, 'PUBLISHED', 'RIGHT', 2010, 9, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `country_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `brand`
--

INSERT INTO `brand` (`id`, `name`, `country_id`) VALUES
(1, 'Toyota', 1),
(2, 'Honda', 1),
(3, 'Nissan', 1),
(4, 'BMW', 2),
(5, 'Mercedes-Benz', 2),
(6, 'Porsche', 2),
(7, 'ГАЗ', 3),
(8, 'Mazda', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `car`
--

CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `car`
--

INSERT INTO `car` (`id`, `name`, `brand_id`) VALUES
(1, 'Mark II', 1),
(2, 'S2000', 2),
(3, 'Skyline', 3),
(4, 'Silvia', 3),
(5, 'M5', 4),
(6, 'CLS-class', 5),
(7, '911', 6),
(8, 'Sprinter Carib', 1),
(9, 'X-Trail', 3),
(10, '3110', 7),
(11, 'Camry', 1),
(12, 'RX-7', 8);

-- --------------------------------------------------------

--
-- Структура таблицы `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `ad_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `chat`
--

INSERT INTO `chat` (`id`, `ad_id`, `buyer_id`) VALUES
(23, 2, 3),
(24, 16, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `country`
--

INSERT INTO `country` (`id`, `name`) VALUES
(1, 'Япония'),
(2, 'Германия'),
(3, 'Россия'),
(4, 'Австралия');

-- --------------------------------------------------------

--
-- Структура таблицы `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `ad_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `favorites`
--

INSERT INTO `favorites` (`id`, `ad_id`, `user_id`) VALUES
(6, 2, 1),
(9, 5, 3),
(11, 2, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `ad_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `viewed_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `history`
--

INSERT INTO `history` (`id`, `ad_id`, `user_id`, `viewed_at`) VALUES
(32, 4, 4, '2025-05-23 00:57:23.000000'),
(33, 4, 4, '2025-05-23 00:57:23.000000'),
(34, 2, 4, '2025-05-23 01:06:07.000000'),
(35, 2, 4, '2025-05-23 01:06:07.000000'),
(36, 5, 4, '2025-05-23 01:09:32.000000'),
(37, 5, 4, '2025-05-23 01:09:32.000000'),
(43, 7, 3, '2025-05-24 01:37:25.000000'),
(44, 8, 3, '2025-05-24 01:37:29.000000'),
(45, 8, 3, '2025-05-24 01:37:29.000000'),
(46, 9, 3, '2025-05-24 01:37:37.000000'),
(48, 10, 3, '2025-05-24 01:39:33.000000'),
(50, 11, 3, '2025-05-24 01:39:36.000000'),
(52, 12, 3, '2025-05-24 01:39:40.000000'),
(54, 13, 3, '2025-05-24 01:39:43.000000'),
(56, 14, 3, '2025-05-24 01:39:45.000000'),
(58, 2, 2, '2025-05-24 01:44:51.000000'),
(59, 2, 2, '2025-05-24 01:44:51.000000'),
(60, 5, 2, '2025-05-24 01:47:06.000000'),
(61, 5, 2, '2025-05-24 01:47:06.000000'),
(67, 8, 1, '2025-05-24 01:55:01.000000'),
(68, 9, 1, '2025-05-24 01:55:04.000000'),
(69, 9, 1, '2025-05-24 01:55:04.000000'),
(70, 10, 1, '2025-05-24 01:55:07.000000'),
(71, 10, 1, '2025-05-24 01:55:07.000000'),
(72, 11, 1, '2025-05-24 01:55:14.000000'),
(73, 11, 1, '2025-05-24 01:55:14.000000'),
(74, 12, 1, '2025-05-24 01:55:17.000000'),
(75, 12, 1, '2025-05-24 01:55:17.000000'),
(77, 13, 1, '2025-05-24 01:55:22.000000'),
(78, 14, 1, '2025-05-24 01:55:28.000000'),
(83, 2, 3, '2025-05-24 02:02:47.000000'),
(84, 2, 1, '2025-05-24 02:06:56.000000'),
(88, 4, 3, '2025-05-24 02:10:48.000000'),
(90, 15, 3, '2025-05-24 02:10:50.000000'),
(92, 16, 4, '2025-05-24 02:21:42.000000'),
(93, 16, 4, '2025-05-24 02:21:42.000000'),
(94, 16, 3, '2025-05-24 02:22:21.000000'),
(95, 16, 3, '2025-05-24 02:22:21.000000');

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `content`, `created_at`, `chat_id`, `sender_id`) VALUES
(60, 'Здравствуйте! Обмен на X-trail интересует?', '2025-05-24 02:21:23.000000', 23, 3),
(61, 'Здравствуйте! Только с вашей доплатой', '2025-05-24 02:21:34.000000', 23, 2),
(62, 'Еще продаете?', '2025-05-24 02:21:51.000000', 24, 4),
(63, 'Здравствуйте, да', '2025-05-24 02:22:04.000000', 24, 3),
(64, 'Не удивлен', '2025-05-24 02:22:09.000000', 24, 4),
(65, ':(', '2025-05-24 02:22:15.000000', 24, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `photo`
--

CREATE TABLE `photo` (
  `id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `ad_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `photo`
--

INSERT INTO `photo` (`id`, `file_name`, `mime_type`, `ad_id`) VALUES
(5, '4124d121-457d-4d21-83de-54f842ef7ea9_photo_2025-05-22_21-40-15.jpg', 'image/jpeg', 4),
(9, '96e2f118-b105-44dc-ad5e-6083f489a6a1_31484.jpg', 'image/jpeg', 5),
(21, 'ee11fb2f-9b98-413e-9ca9-e1e9c398896d_photo_2025-05-22_21-40-22.jpg', 'image/jpeg', 2),
(22, '81ae8317-53a7-4696-b87f-480a48900811_Uq923ydbD4E.jpg', 'image/jpeg', 2),
(23, 'a4e9f1be-3ffb-49c7-a1fa-ba66d4971f88_photo_2025-05-24_01-45-24.jpg', 'image/jpeg', 2),
(24, '1980a8c9-389c-4b18-816b-95e6366527b4_photo_2025-05-24_02-06-08.jpg', 'image/jpeg', 15),
(25, 'a6ce565b-9ad1-4d14-9ac5-3ce32954bc42_photo_2025-05-22_21-40-57.jpg', 'image/jpeg', 16),
(26, '8dc024cb-fb8e-4c53-afab-6f072a9b4ef0_photo_2025-05-22_21-40-18.jpg', 'image/jpeg', 16);

-- --------------------------------------------------------

--
-- Структура таблицы `seller_review`
--

CREATE TABLE `seller_review` (
  `id` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `rating` enum('FIVE','FOUR','ONE','THREE','TWO') NOT NULL,
  `ad_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(120) NOT NULL,
  `register_date` datetime(6) NOT NULL,
  `role` enum('ADMIN','USER') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `password`, `register_date`, `role`) VALUES
(1, 'admin@mail.ru', 'admin', '$2a$10$fBzif.Ep/NfN5KjXfoyiaO0xyOpjVHokc53U1Z4SWPTk2yFlEAtU6', '2025-05-19 22:42:12.000000', 'ADMIN'),
(2, 'dmon@yandex.ru', 'D.Mon', '$2a$10$JrgwnPGAcuPzoiOrrew7F.6AcI5OAqZ6SWffXbH3ErONsBZugygdS', '2025-05-21 15:54:33.000000', 'USER'),
(3, 'egorbeley@mail.ru', 'snipermocs', '$2a$10$VAB6pPiHM3MBomdufYrCI.wO7ZIv4LnPaaBukg8T2RvzwDNdAcHIa', '2025-05-22 21:34:08.000000', 'USER'),
(4, 'gosh@mail.ru', 'gosha002', '$2a$10$1jD/o8WSeyAKu9k/wDbNJO2e4ZHKgCjfbfOW10DCqnaV/0/m.QX9u', '2025-05-22 23:03:11.000000', 'USER');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `advertisement`
--
ALTER TABLE `advertisement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKaklvhmgf335qr2yda3ek883hm` (`car_id`),
  ADD KEY `FKjmwcql3vy3plaoidej1mendcf` (`publisher_id`);

--
-- Индексы таблицы `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK8iehti3u9vucvh3qnd6s143pf` (`country_id`);

--
-- Индексы таблицы `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKj1mws2ruu9q6k2sa4pwlxthxn` (`brand_id`);

--
-- Индексы таблицы `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKml5d52lycgwt479tarb5iettr` (`ad_id`),
  ADD KEY `FKnfadd6anyisrprokf1006nn6n` (`buyer_id`);

--
-- Индексы таблицы `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK490onpjl6vwaefc6s37gp0362` (`ad_id`),
  ADD KEY `FK1uphh0glinnprjknyl68k1hw1` (`user_id`);

--
-- Индексы таблицы `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2a65xr45x62h4pj20usm6rans` (`ad_id`),
  ADD KEY `FKn4gjyu69m6xa5f3bot571imbe` (`user_id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdumcu11xf8ldun8i4xpd04j43` (`chat_id`),
  ADD KEY `FKip9clvpi646rirksmm433wykx` (`sender_id`);

--
-- Индексы таблицы `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkd8xlveiqp9ga0qy3j4gp1nsn` (`ad_id`);

--
-- Индексы таблицы `seller_review`
--
ALTER TABLE `seller_review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK4fqj0f9wlto10xqt8vvj6fw62` (`ad_id`),
  ADD KEY `FKnpciffydoqmpilkq6csat7blw` (`buyer_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKgj2fy3dcix7ph7k8684gka40c` (`name`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `advertisement`
--
ALTER TABLE `advertisement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT для таблицы `photo`
--
ALTER TABLE `photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `seller_review`
--
ALTER TABLE `seller_review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `advertisement`
--
ALTER TABLE `advertisement`
  ADD CONSTRAINT `FKaklvhmgf335qr2yda3ek883hm` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`),
  ADD CONSTRAINT `FKjmwcql3vy3plaoidej1mendcf` FOREIGN KEY (`publisher_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `FK8iehti3u9vucvh3qnd6s143pf` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`);

--
-- Ограничения внешнего ключа таблицы `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `FKj1mws2ruu9q6k2sa4pwlxthxn` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`);

--
-- Ограничения внешнего ключа таблицы `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `FKml5d52lycgwt479tarb5iettr` FOREIGN KEY (`ad_id`) REFERENCES `advertisement` (`id`),
  ADD CONSTRAINT `FKnfadd6anyisrprokf1006nn6n` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FK1uphh0glinnprjknyl68k1hw1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK490onpjl6vwaefc6s37gp0362` FOREIGN KEY (`ad_id`) REFERENCES `advertisement` (`id`);

--
-- Ограничения внешнего ключа таблицы `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `FK2a65xr45x62h4pj20usm6rans` FOREIGN KEY (`ad_id`) REFERENCES `advertisement` (`id`),
  ADD CONSTRAINT `FKn4gjyu69m6xa5f3bot571imbe` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `FKdumcu11xf8ldun8i4xpd04j43` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FKip9clvpi646rirksmm433wykx` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `FKkd8xlveiqp9ga0qy3j4gp1nsn` FOREIGN KEY (`ad_id`) REFERENCES `advertisement` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `seller_review`
--
ALTER TABLE `seller_review`
  ADD CONSTRAINT `FK4fqj0f9wlto10xqt8vvj6fw62` FOREIGN KEY (`ad_id`) REFERENCES `advertisement` (`id`),
  ADD CONSTRAINT `FKnpciffydoqmpilkq6csat7blw` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
