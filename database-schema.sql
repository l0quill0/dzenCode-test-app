-- MySQL Workbench Forward Engineering / Reverse Engineering Schema
-- Open in MySQL Workbench via: File -> Import -> Reverse Engineer MySQL Create Script...

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `dzencode_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `dzencode_db` ;

-- -----------------------------------------------------
-- Table `dzencode_db`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dzencode_db`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `avatar` VARCHAR(500) NOT NULL DEFAULT '',
  `password` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `User_email_key` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `dzencode_db`.`Order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dzencode_db`.`Order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `dzencode_db`.`Group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dzencode_db`.`Group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `dzencode_db`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dzencode_db`.`Product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `serialNumber` VARCHAR(255) NOT NULL,
  `isNew` INT NOT NULL DEFAULT 1,
  `photo` VARCHAR(500) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `specification` VARCHAR(255) NOT NULL,
  `status` ENUM('FREE', 'IN_REPAIR') NOT NULL DEFAULT 'FREE',
  `statusStart` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `statusEnd` DATETIME(3) NULL DEFAULT NULL,
  `guaranteeStart` DATETIME(3) NOT NULL,
  `guaranteeEnd` DATETIME(3) NOT NULL,
  `order` INT NOT NULL,
  `groupId` INT NULL DEFAULT NULL,
  `userId` INT NULL DEFAULT NULL,
  `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `Product_order_fkey_idx` (`order` ASC) VISIBLE,
  INDEX `Product_groupId_fkey_idx` (`groupId` ASC) VISIBLE,
  INDEX `Product_userId_fkey_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `Product_order_fkey`
    FOREIGN KEY (`order`)
    REFERENCES `dzencode_db`.`Order` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `Product_groupId_fkey`
    FOREIGN KEY (`groupId`)
    REFERENCES `dzencode_db`.`Group` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `Product_userId_fkey`
    FOREIGN KEY (`userId`)
    REFERENCES `dzencode_db`.`User` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `dzencode_db`.`Price`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dzencode_db`.`Price` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `value` DOUBLE NOT NULL,
  `symbol` VARCHAR(10) NOT NULL,
  `isDefault` INT NOT NULL DEFAULT 0,
  `productId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `Price_productId_fkey_idx` (`productId` ASC) VISIBLE,
  CONSTRAINT `Price_productId_fkey`
    FOREIGN KEY (`productId`)
    REFERENCES `dzencode_db`.`Product` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
