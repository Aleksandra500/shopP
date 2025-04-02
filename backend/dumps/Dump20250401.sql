-- MySQL dump 10.13  Distrib 8.0.41, for macos15 (arm64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,8,100.50,'2025-03-28 23:28:43'),(2,5,50.00,'2025-03-28 00:00:00'),(3,7,75.00,'2025-03-29 00:00:00'),(4,4,100.00,'2025-03-30 00:00:00'),(5,5,50.00,'2025-03-28 00:00:00'),(6,7,75.00,'2025-03-29 00:00:00'),(7,4,100.00,'2025-03-30 00:00:00'),(8,2,50.00,'2025-03-28 00:00:00'),(9,8,75.00,'2025-03-29 00:00:00'),(10,4,100.00,'2025-03-30 00:00:00'),(11,3,50.00,'2025-03-28 00:00:00'),(12,7,75.00,'2025-03-29 00:00:00'),(13,6,100.00,'2025-03-30 00:00:00'),(14,2,50.00,'2025-03-28 00:00:00'),(15,2,50.00,'2025-03-28 00:00:00');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'Essence Mascara Lash Princess','The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.','13fe1781dccd93a943fe5ea61be8f451',17.00),(4,'Luxe Glow Foundation','Achieve a flawless, radiant complexion with Luxe Glow Foundation. Infused with hydrating ingredients, this lightweight formula provides buildable coverage while keeping your skin nourished and glowing all day.','8a244f27434e091b0608ba0468d4d5a0',24.00),(5,'Velvet Matte Lipstick','Experience the perfect blend of bold color and smooth texture with Velvet Matte Lipstick. Long-lasting and non-drying, this lipstick glides on effortlessly, giving you a stunning, velvety finish.','c778912476a6da33e73bd45a9efd6222',12.00),(6,'Hydrating Mist Toner','Refresh and revitalize your skin with Hydrating Mist Toner. Enriched with natural botanical extracts, this mist provides an instant boost of hydration, leaving your skin soft, dewy, and refreshed.','6d3ac4eda67b3321a54eb6629d3d4a7f',14.00),(7,'Glow & Shine Highlighter Palette','Add a touch of radiance to your look with the Glow & Shine Highlighter Palette. Featuring four luminous shades, this palette enhances your natural beauty with a silky, blendable texture that catches the light beautifully.','ad12a24df91287306f405a5a3588cdfb',15.00),(8,'Silk Touch Primer','Prep your skin for a flawless makeup application with Silk Touch Primer. This lightweight, silky formula smooths fine lines, minimizes pores, and extends the wear of your makeup for a perfect, long-lasting look.','ff31c955d3dc57af02d7530718a14e26',17.00),(9,'Radiance Boost Vitamin C Serum','Brighten and even out your skin tone with Radiance Boost Vitamin C Serum. Packed with antioxidants, this lightweight serum reduces dark spots and fine lines, leaving your skin looking fresh, healthy, and glowing.','201fefa1adc8d5802cac829b8868763a',13.00),(11,'Soft Glow Blush Stick','Achieve a natural, radiant flush with the Soft Glow Blush Stick. The creamy, blendable formula melts into the skin, providing a dewy, youthful glow with just one swipe.','6370026cbd12de595d162a8c0949edf5',9.00),(12,'Ultra Shine Lip Gloss','Give your lips a luscious, high-shine finish with Ultra Shine Lip Gloss. Infused with nourishing oils, this non-sticky formula keeps your lips soft, plump, and beautifully glossy.','bcbcb46c290590e5e9b6d251fdf7fd03',10.00),(13,'Midnight Magic Eyeshadow Palette','Create mesmerizing eye looks with the Midnight Magic Eyeshadow Palette. Featuring richly pigmented shades with a mix of matte, shimmer, and metallic finishes, this palette lets you go from subtle to bold with ease.','587b46967625b170c8f8a278bb65f3d7',13.00),(14,'Waterproof Lash Volumizer Mascara','Get bold, dramatic lashes with Waterproof Lash Volumizer Mascara. The smudge-proof and long-lasting formula adds instant volume, length, and curl to your lashes, keeping them perfect all day long.','258f3a9a9b866473744f1d3ea152fba1',17.00),(15,'Eyebrow Pencil','A long-lasting eyebrow pencil that shapes and defines your brows with a natural finish. Comes in a variety of shades to match your natural hair color. Ideal for creating precise lines and filling in sparse areas of the eyebrows. Waterproof and smudge-proof formula for all-day wear.','db1523bcb4d30f5715841e39fa6601bd',8.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'marko','Marko','$2b$10$Tf0edBM0iRvd8iXnmOMuwOufKGW3Do9GYPUhKRI4lbyEqNQqepkVe','marko@gmail.com','admin'),(3,'janko','janko','$2b$10$PwdY6cUYtsNz6xF90uCOz.YBXCrHL6zBdp.pGgn9k4IIMLvixSPD2','janko@gmail.com','user'),(4,'milica','milica','$2b$10$qYJ0Dgg2MDwQo1N.1nV6n.OXppqyHQqGFibxSj5KwFyGEtDkpDcIe','milica@gmail.com','user'),(5,'stasa','stasa','$2b$10$J1ylIeY80uQw7EgcO.tkA.fmzw2ZBo6UNYA.NHWatPRpzAo0RwNnO','stasa@gmail.com','user'),(6,'stasa1','stasa1','$2b$10$MdOMOu3Qb3nNAYumLY0r6uuZ5LAyp/RrqsXXWTm7O6.gqMYTXO.MO','stasa1@gmail.com','user'),(7,'steva','steva','$2b$10$sFBzEhrZmqsweMZgL976Uush1RAmsz57ilnyFsxTTlEpAr5404k6.','steva@gmail.com','user'),(8,'ana','ana','$2b$10$WndrHoMbpxqEfxEk82izney54w3KInIzckLsoqfCBXfatOvAKlhZO','acomagic23@gmail.com','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-02 13:33:14
