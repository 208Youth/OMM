-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: j8c208.p.ssafy.io    Database: cc24
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `authenticator`
--

DROP TABLE IF EXISTS `authenticator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authenticator` (
  `authenticator_id` bigint NOT NULL AUTO_INCREMENT,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `certificate_id` bigint DEFAULT NULL,
  PRIMARY KEY (`authenticator_id`),
  KEY `FKaj4qhpboppo3u720u3k1o7b9s` (`certificate_id`),
  CONSTRAINT `FKaj4qhpboppo3u720u3k1o7b9s` FOREIGN KEY (`certificate_id`) REFERENCES `certificate` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authenticator`
--

LOCK TABLES `authenticator` WRITE;
/*!40000 ALTER TABLE `authenticator` DISABLE KEYS */;
INSERT INTO `authenticator` VALUES (1,'1999-11-16','FEMALE','김윤미',3),(2,'1997-05-09','MALE','박성완',1),(3,'1996-12-05','FEMALE','원채령',6),(4,'2000-01-20','FEMALE','안수빈',8),(5,'1996-03-28','MALE','임양원',10),(6,'2000-01-07','FEMALE','최보영',1),(7,'1985-01-01','FEMALE','하니',1);
/*!40000 ALTER TABLE `authenticator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
INSERT INTO `certificate` VALUES (1,'정보처리기사'),(2,'컴퓨터활용능력 1급'),(3,'한국사능력검정 1급'),(4,'SQLD'),(5,'한자 1급'),(6,'OPIC AL'),(7,'주산 1급'),(8,'리눅스마스터 2급'),(9,'종이접기 마스터'),(10,'̦반려견스타일리스트 1급');
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` bigint NOT NULL AUTO_INCREMENT,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `job_id` bigint DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `FK3qan7dnbwrvqngcqup9h9a1tt` (`job_id`),
  CONSTRAINT `FK3qan7dnbwrvqngcqup9h9a1tt` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'1999-11-16','FEMALE','김윤미',3),(2,'1997-05-09','MALE','박성완',1),(3,'1996-12-05','FEMALE','원채령',10),(4,'2000-01-20','FEMALE','안수빈',8),(5,'1996-03-28','MALE','임양원',10),(6,'2000-01-07','FEMALE','최보영',1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estate`
--

DROP TABLE IF EXISTS `estate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estate` (
  `estate_id` bigint NOT NULL AUTO_INCREMENT,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `amount` bigint NOT NULL,
  PRIMARY KEY (`estate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estate`
--

LOCK TABLES `estate` WRITE;
/*!40000 ALTER TABLE `estate` DISABLE KEYS */;
INSERT INTO `estate` VALUES (1,'1999-11-16','FEMALE','김윤미',10000000),(2,'1997-05-09','MALE','박성완',200000000),(3,'1996-12-05','FEMALE','원채령',1000000000),(4,'2000-01-20','FEMALE','안수빈',100000000),(5,'1996-03-28','MALE','임양원',10000000000),(6,'2000-01-07','FEMALE','최보영',1000000000000),(7,'1997-05-09','MALE','박성완',200000000),(8,'2000-01-20','FEMALE','안수빈',100000000),(9,'2000-01-20','FEMALE','안수빈',100000000),(10,'2000-01-20','FEMALE','안수빈',100000000),(11,'2000-01-20','FEMALE','안수빈',100000000),(12,'2000-01-20','FEMALE','안수빈',100000000),(13,'2000-01-20','FEMALE','안수빈',100000000),(14,'2000-01-20','FEMALE','안수빈',100000000),(15,'2000-01-20','FEMALE','안수빈',100000000),(16,'2000-01-20','FEMALE','안수빈',100000000),(17,'2000-01-20','FEMALE','안수빈',100000000),(18,'2000-01-20','FEMALE','안수빈',100000000),(19,'2000-01-20','FEMALE','안수빈',100000000),(20,'2000-01-20','FEMALE','안수빈',100000000),(21,'2000-01-20','FEMALE','안수빈',100000000),(22,'2000-01-20','FEMALE','안수빈',100000000),(23,'2000-01-20','FEMALE','안수빈',100000000),(24,'2000-01-20','FEMALE','안수빈',100000000),(25,'2000-01-20','FEMALE','안수빈',100000000),(26,'2000-01-20','FEMALE','안수빈',100000000),(27,'2000-01-20','FEMALE','안수빈',100000000),(28,'2000-01-20','FEMALE','안수빈',100000000),(29,'2000-01-20','FEMALE','안수빈',100000000),(30,'2000-01-20','FEMALE','안수빈',100000000),(31,'2000-01-20','FEMALE','안수빈',100000000),(32,'2000-01-20','FEMALE','안수빈',100000000),(33,'2000-01-20','FEMALE','안수빈',100000000),(34,'2000-01-20','FEMALE','안수빈',100000000),(35,'2000-01-20','FEMALE','안수빈',100000000),(36,'2000-01-20','FEMALE','안수빈',100000000),(37,'1996-12-05','FEMALE','원채령',1000000000),(38,'1996-12-05','FEMALE','원채령',1000000000),(39,'1996-12-05','FEMALE','원채령',1000000000),(40,'1996-12-05','FEMALE','원채령',1000000000),(41,'1996-12-05','FEMALE','원채령',1000000000),(42,'1996-12-05','FEMALE','원채령',1000000000),(43,'1996-12-05','FEMALE','원채령',1000000000),(44,'1996-12-05','FEMALE','원채령',1000000000),(45,'1996-12-05','FEMALE','원채령',1000000000),(46,'1996-03-28','MALE','임양원',10000000000),(47,'1996-03-28','MALE','임양원',10000000000),(48,'1996-03-28','MALE','임양원',10000000000),(49,'1996-03-28','MALE','임양원',10000000000),(50,'1996-03-28','MALE','임양원',10000000000),(51,'1996-03-28','MALE','임양원',10000000000),(52,'1996-03-28','MALE','임양원',10000000000),(53,'1996-03-28','MALE','임양원',10000000000),(54,'1996-03-28','MALE','임양원',10000000000),(55,'1996-03-28','MALE','임양원',10000000000),(56,'1996-03-28','MALE','임양원',10000000000),(57,'1996-03-28','MALE','임양원',10000000000),(58,'1996-03-28','MALE','임양원',10000000000),(59,'1996-03-28','MALE','임양원',10000000000),(60,'1996-03-28','MALE','임양원',10000000000),(61,'1996-03-28','MALE','임양원',10000000000),(62,'1996-03-28','MALE','임양원',10000000000),(63,'1996-03-28','MALE','임양원',10000000000),(64,'1996-03-28','MALE','임양원',10000000000),(65,'1996-03-28','MALE','임양원',10000000000),(66,'1994-05-29','MALE','함시연',3000000000),(67,'1995-07-15','MALE','박준영',3000000000),(68,'1999-11-16','FEMALE','김윤미',20000000),(69,'1999-11-16','FEMALE','김윤미',30000000),(70,'1999-11-16','FEMALE','김윤미',40000000),(71,'1999-11-16','FEMALE','김윤미',50000000),(72,'1985-01-01','FEMALE','하니',10000000000),(73,'1985-01-01','FEMALE','하니',300000000),(74,'1985-01-01','FEMALE','하니',50000000000);
/*!40000 ALTER TABLE `estate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `health`
--

DROP TABLE IF EXISTS `health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `health` (
  `health_id` bigint NOT NULL AUTO_INCREMENT,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`health_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health`
--

LOCK TABLES `health` WRITE;
/*!40000 ALTER TABLE `health` DISABLE KEYS */;
INSERT INTO `health` VALUES (1,'1999-11-16','FEMALE','김윤미','2020-01-23','건강검진정보임'),(2,'1997-05-09','MALE','박성완','2020-01-28','건강검진정보임'),(3,'1996-12-05','FEMALE','원채령','2022-04-23','건강검진정보임'),(4,'2000-01-20','FEMALE','안수빈','2020-05-22','건강검진정보임'),(5,'1996-03-28','MALE','임양원','2021-08-03','건강검진정보임'),(6,'2000-01-07','FEMALE','최보영','2019-04-11','건강검진정보임');
/*!40000 ALTER TABLE `health` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `income`
--

DROP TABLE IF EXISTS `income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income` (
  `income_id` bigint NOT NULL AUTO_INCREMENT,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `amount` bigint NOT NULL,
  PRIMARY KEY (`income_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `income`
--

LOCK TABLES `income` WRITE;
/*!40000 ALTER TABLE `income` DISABLE KEYS */;
INSERT INTO `income` VALUES (1,'1999-11-16',NULL,'김윤미',10000000),(2,'1997-05-09',NULL,'박성완',200000000),(3,'1996-12-05',NULL,'원채령',1000000000),(4,'2000-01-20',NULL,'안수빈',100000000),(5,'1996-03-28',NULL,'임양원',10000000000),(6,'2000-01-07',NULL,'최보영',1000000000000);
/*!40000 ALTER TABLE `income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,'(주)싸피'),(2,'회계사'),(3,'미래싸피'),(4,'싸피건설'),(5,'변호사'),(6,'싸피제약'),(7,'싸피오토에버'),(8,'의사'),(9,'싸피DX'),(10,'싸피전자');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` bigint NOT NULL AUTO_INCREMENT,
  `birth_date` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `university_id` bigint DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `FK157t7rer269uuhfphq1mcd7y9` (`university_id`),
  CONSTRAINT `FK157t7rer269uuhfphq1mcd7y9` FOREIGN KEY (`university_id`) REFERENCES `university` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'1999-11-16','FEMALE','김윤미',3),(2,'1997-05-09','MALE','박성완',1),(3,'1996-12-05','FEMALE','원채령',6),(4,'2000-01-20','FEMALE','안수빈',8),(5,'1996-03-28','MALE','임양원',10),(6,'2000-01-07','FEMALE','최보영',1),(7,'1985-01-01','FEMALE','하니',1);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES (1,'싸울대학교'),(2,'싸려대학교'),(3,'싸세대학교'),(4,'싸양대학교'),(5,'싸균관대학교'),(6,'싸강대학교'),(7,'싸앙대학교'),(8,'싸희대학교'),(9,'싸피외국어대학교'),(10,'̦싸울시립대학교');
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07  2:44:37
