-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: store_users
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `discount_codes`
--

DROP TABLE IF EXISTS `discount_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_codes` (
  `discount_id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `discount_value` decimal(5,2) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `min_order_amount` decimal(10,2) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `item_id` int DEFAULT NULL,
  PRIMARY KEY (`discount_id`),
  UNIQUE KEY `code` (`code`),
  KEY `fk_item` (`item_id`),
  CONSTRAINT `fk_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_codes`
--

LOCK TABLES `discount_codes` WRITE;
/*!40000 ALTER TABLE `discount_codes` DISABLE KEYS */;
INSERT INTO `discount_codes` VALUES (1,'SUMMER25',25.00,'2024-07-01','2024-08-31',50.00,1,1),(2,'WELCOME10',10.00,'2024-07-01','2024-12-31',20.00,1,6),(4,'3AMBEANS',100.00,'2024-07-22','2024-12-25',5.00,1,8),(6,'BANANA50',3.00,'2024-07-01','2024-08-10',1.00,1,2),(7,'BEER_4_ALL',9.99,NULL,NULL,1.00,1,10);
/*!40000 ALTER TABLE `discount_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Green Apples','Fresh Fuji Apples',50.50,25,'Fruit'),(2,'Bananas','Ripe bananas',5.75,100,'Fruit'),(5,'Eggs','Large brown eggs, dozen',1.99,40,'Meat'),(6,'Ravioli','YUMMYYY',21.00,3,'Canned Good'),(7,'Oranges','Test',5.50,900,'Fruit'),(8,'Pear','This pear is a grape option',2.22,5,'Fruit'),(9,'Pineapple','Under the sea',4.12,20,'Fruit'),(10,'BEER','STRAIGHT UP BEER',12.50,35,'Beverage'),(11,'Toy car','Hot wheels',3.99,100,'Toy'),(12,'Soup','Campbells',3.00,100,'Canned Good'),(13,'Milk','32oz of Milk in Container',2.46,50,'Beverage');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (3,8,1,2),(4,8,5,12);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `order_items_view`
--

DROP TABLE IF EXISTS `order_items_view`;
/*!50001 DROP VIEW IF EXISTS `order_items_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `order_items_view` AS SELECT 
 1 AS `order_id`,
 1 AS `item_id`,
 1 AS `item_name`,
 1 AS `description`,
 1 AS `price`,
 1 AS `quantity`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `order_status` varchar(50) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `shipping_address` varchar(255) DEFAULT NULL,
  `billing_address` varchar(255) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `shipping_method` varchar(100) DEFAULT NULL,
  `promo_code` varchar(50) DEFAULT NULL,
  `order_notes` text,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (8,3,'2024-07-14 16:55:42','Pending',100.00,'123 Main St, Anytown, USA','123 Billing St, Anytown, USA','Credit Card','Standard Shipping',NULL,'Please ensure delivery by end of the week.'),(10,4,'2024-07-18 15:24:05',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,3,'2024-07-25 01:02:19','Processing',661.26,'774 Main St, City Y','377 Main St, City B','Credit Card','Overnight',NULL,NULL),(13,5,'2024-06-30 01:07:55','Shipped',635.56,'556 Main St, City Y','996 Main St, City E','Bank Transfer','Standard',NULL,'Handle with care'),(14,3,'2024-07-02 01:08:25','Cancelled',612.24,'194 Main St, City E','375 Main St, City H','PayPal','Standard',NULL,NULL),(15,5,'2024-07-21 01:08:56','Shipped',810.48,'473 Main St, City Z','403 Main St, City D','PayPal','Express',NULL,'Handle with care'),(16,4,'2024-07-01 01:08:58','Processing',747.38,'550 Main St, City O','87 Main St, City U','Bank Transfer','Standard',NULL,'Handle with care'),(17,4,'2024-07-03 01:09:38','Delivered',196.64,'933 Main St, City F','229 Main St, City N','Bank Transfer','Standard',NULL,'Handle with care'),(18,3,'2024-07-01 01:10:33','Delivered',199.93,'828 Main St, City R','864 Main St, City I','Bank Transfer','Overnight',NULL,'Handle with care'),(19,5,'2024-07-12 01:10:35','Processing',341.58,'116 Main St, City R','935 Main St, City S','Bank Transfer','Express',NULL,'Handle with care'),(20,4,'2024-07-11 01:10:36','Delivered',122.13,'894 Main St, City G','531 Main St, City Y','Credit Card','Express',NULL,'Handle with care'),(21,3,'2024-07-21 01:10:37','Processing',631.18,'42 Main St, City J','744 Main St, City P','Bank Transfer','Overnight',NULL,'Handle with care'),(22,5,'2024-07-17 01:10:38','Delivered',260.80,'839 Main St, City N','128 Main St, City B','Bank Transfer','Standard',NULL,'Handle with care'),(23,4,'2024-07-23 01:10:39','Shipped',727.14,'576 Main St, City T','988 Main St, City S','PayPal','Overnight',NULL,NULL),(24,4,'2024-06-30 01:34:17','Delivered',843.51,'763 Main St, City I','273 Main St, City L','Credit Card','Standard','PROMO731',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Geoff Keighley','GeoffGetsBread@gmail.com','b0db6fecedbf60c7bb176a54d0bb47964319c5f60d0475e335ac3c7b5c55febd'),(4,'Mark Fischbach','FNAFKING@yahoo.com','cd1573dd0d6452dae21bf9190c835209ecd40c73246b76ec910ec25f60e0e8b9'),(5,'Elon Musk','IScrewedUpTwitter@x.com','092534b6eceb7a992ca019f25f96581d767dd459707e13f4b0edfdff508deb4f');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `order_items_view`
--

/*!50001 DROP VIEW IF EXISTS `order_items_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `order_items_view` AS select `o`.`order_id` AS `order_id`,`i`.`item_id` AS `item_id`,`i`.`item_name` AS `item_name`,`i`.`description` AS `description`,`i`.`price` AS `price`,`oi`.`quantity` AS `quantity` from ((`orders` `o` join `order_items` `oi` on((`o`.`order_id` = `oi`.`order_id`))) join `items` `i` on((`oi`.`item_id` = `i`.`item_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-29  0:08:20
