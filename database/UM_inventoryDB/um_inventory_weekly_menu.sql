-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: um_inventory
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `weekly_menu`
--

DROP TABLE IF EXISTS `weekly_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weekly_menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `session` enum('lunch','dinner') NOT NULL,
  `sabji1` varchar(100) NOT NULL,
  `sabji2` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_day_session` (`day`,`session`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weekly_menu`
--

LOCK TABLES `weekly_menu` WRITE;
/*!40000 ALTER TABLE `weekly_menu` DISABLE KEYS */;
INSERT INTO `weekly_menu` VALUES (1,'Monday','lunch','fool gobi','Dal Tadka'),(2,'Monday','dinner','Paneer Butter Masala','Chana Masala'),(3,'Tuesday','lunch','Mix Veg','Rajma'),(4,'Tuesday','dinner','Palak Paneer','Kadhi'),(5,'Wednesday','lunch','Baingan Bharta','Moong Dal'),(6,'Wednesday','dinner','Matar Paneer','Chole'),(7,'Thursday','lunch','Bhindi Masala','Arhar Dal'),(8,'Thursday','dinner','Shahi Paneer','Kala Chana'),(9,'Friday','lunch','Cabbage Sabzi','Masoor Dal'),(10,'Friday','dinner','Kadai Paneer','Rajma Masala'),(11,'Saturday','lunch','Lauki Sabzi','Chana Dal'),(12,'Saturday','dinner','Malai Kofta','Dal Makhani'),(13,'Sunday','lunch','Aloo Matar','Urad Dal'),(14,'Sunday','dinner','Veg Korma','Pindi Chole');
/*!40000 ALTER TABLE `weekly_menu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-11  2:26:55
