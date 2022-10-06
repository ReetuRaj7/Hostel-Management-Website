CREATE TABLE `hostel`.`user` (
    `id` INT NOT NULL AUTO_INCREMENT ,
    `first_name` VARCHAR(45) NOT NULL ,
    `last_name` VARCHAR(45) NOT NULL ,
    `room_no` INT NOT NULL ,
    `phone` VARCHAR(45) NOT NULL ,
    `comments` TEXT NOT NULL ,
    `status` VARCHAR(10) NOT NULL DEFAULT 'active' ,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;


CREATE TABLE `hostel`.`resident` ( 
    `res_id` INT NOT NULL , 
    `res_first_name` VARCHAR(20) NOT NULL , 
    `res_city` VARCHAR(20) NOT NULL , 
    `res_state` VARCHAR(20) NOT NULL 
) ENGINE = InnoDB;
CREATE TABLE `hostel`.`accounts` ( 
    `username` VARCHAR(20) NOT NULL , 
    `password` VARCHAR(20) NOT NULL , 
    PRIMARY KEY (`username`)
) ENGINE = InnoDB;
INSERT INTO `accounts`(`username`, `password`) VALUES ('user1234','trial123')