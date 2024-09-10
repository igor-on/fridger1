DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS planned_recipe;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS groceries_list_ingredient;
DROP TABLE IF EXISTS fridge_ingredient;
DROP TABLE IF EXISTS fridges;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS groceries_lists;


CREATE TABLE IF NOT EXISTS `recipes` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(55) NOT NULL UNIQUE,
  `description` varchar(255),
  `instructions` varchar(255) NOT NULL,
  `image_url` varchar(255),
  `link` varchar(255),
  `favorite` boolean,
  `username` varchar(50),
  CONSTRAINT FK_username_recipe FOREIGN KEY (`username`) REFERENCES `users` (`username`)
);

CREATE TABLE IF NOT EXISTS `ingredients` (
  `name` varchar(255) PRIMARY KEY,
  `type` varchar(55) NOT NULL
);

CREATE TABLE IF NOT EXISTS `recipe_ingredient` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` bigint NOT NULL,
  `ingredient_name` varchar(255) NOT NULL,
  `quantity` double NOT NULL,
  `unit` varchar(255) NOT NULL,
  CONSTRAINT FK_recipe_ingredient FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT FK_ingredient_recipe_ingredient FOREIGN KEY (`ingredient_name`) REFERENCES `ingredients` (`name`)
);

CREATE TABLE IF NOT EXISTS `planned_recipe` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` bigint NOT NULL,
  `planned_date` datetime NOT NULL,
  `done` boolean,
  CONSTRAINT FK_planned_recipe FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
);

CREATE TABLE IF NOT EXISTS `groceries_lists` (
`id` bigint PRIMARY KEY AUTO_INCREMENT,
`start_date` datetime NOT NULL,
`end_date` datetime NOT NULL,
`username` varchar(50),
`with_fridge` boolean,
`fridge_state_date` datetime,
CONSTRAINT FK_username_groceries_list FOREIGN KEY (`username`) REFERENCES `users` (`username`)
);

CREATE TABLE IF NOT EXISTS `groceries_list_ingredient` (
`id` bigint PRIMARY KEY AUTO_INCREMENT,
`groceries_list_id` bigint NOT NULL,
`ingredient_name` varchar(255) NOT NULL,
`quantity` double NOT NULL,
`unit` varchar(255) NOT NULL,
  CONSTRAINT FK_groceries_list_ingredient FOREIGN KEY (`groceries_list_id`) REFERENCES `groceries_lists` (`id`),
  CONSTRAINT FK_ingredient_groceries_list_ingredient FOREIGN KEY (`ingredient_name`) REFERENCES `ingredients` (`name`)
);

CREATE TABLE IF NOT EXISTS `groceries_list_fridge_ingredient` (
`id` bigint PRIMARY KEY AUTO_INCREMENT,
`groceries_list_id` bigint NOT NULL,
`ingredient_name` varchar(255) NOT NULL,
`quantity` double NOT NULL,
`unit` varchar(255) NOT NULL,
`expiration_date` datetime,
  CONSTRAINT FK_groceries_list_fridge_ingredient FOREIGN KEY (`groceries_list_id`) REFERENCES `groceries_lists` (`id`),
  CONSTRAINT FK_ingredient_groceries_list_fridge_ingredient FOREIGN KEY (`ingredient_name`) REFERENCES `ingredients` (`name`)
);

CREATE TABLE IF NOT EXISTS `fridges` (
`username` varchar(55) PRIMARY KEY,
`name` varchar(55) NOT NULL,
CONSTRAINT FK_username_fridge FOREIGN KEY (`username`) REFERENCES `users` (`username`) 
);

CREATE TABLE IF NOT EXISTS `fridge_ingredient` (
`id` bigint PRIMARY KEY AUTO_INCREMENT,
`fridge_id` varchar(55) NOT NULL,
`ingredient_name` varchar(255) NOT NULL,
`quantity` double NOT NULL,
`unit` varchar(255) NOT NULL,
`expiration_date` datetime,
`insert_date` datetime NOT NULL,
  CONSTRAINT FK_fridge_ingredient FOREIGN KEY (`fridge_id`) REFERENCES `fridges` (`username`),
  CONSTRAINT FK_ingredient_fridge_ingredient FOREIGN KEY (`ingredient_name`) REFERENCES `ingredients` (`name`)
);

create table users(
	username varchar(50) not null primary key,
	password varchar(500) not null,
    roles varchar(255) not null,
	enabled boolean not null
);

create table authorities (
	username varchar(50) not null,
	authority varchar(50) not null,
	constraint fk_authorities_users foreign key(username) references users(username)
);
create unique index ix_auth_username on authorities (username,authority);

INSERT INTO users VALUES ('user', 'test', 'USER,ADMIN', true);

UPDATE users SET password = '$2a$10$5Y4caZ.J/4AFVgAZWQ93UO3kyT3LJjhHuoAtHzuet1iH9k58MIwIe' WHERE username = 'user';

SELECT * FROM users;



-- ALTER TABLE `recipe_ingredient` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

-- ALTER TABLE `planned_recipe` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

use fridger_db;
-- SELECT * FROM planned_recipe;
-- select * from recipes;
select * from ingredients;
-- select * from recipe_ingredient;
-- alter table recipes modify instructions varchar(1000);

-- INSERT INTO groceries_lists (id, start_date, end_date) VALUES (1, '2023-12-06T10:00:00','2023-12-12T10:00:00');

-- INSERT INTO groceries_list_ingredient VALUES (1, 1, 6, 2, 'cale'),  (2, 1, 11, 200, 'gram');


-- select * from groceries_lists;
-- select * from groceries_list_ingredient;



-- SELECT * FROM planned_recipe as pr LEFT JOIN recipes as r on pr.recipe_id = r.id; 

-- SELECT ri.id, r.name, pr.planned_date
-- FROM recipe_ingredient as ri
-- LEFT JOIN recipes as r on ri.recipe_id = r.id
-- LEFT JOIN planned_recipe as pr on ri.recipe_id = pr.recipe_id;


-- SELECT pr.planned_date, r.name, i.name, ri.quantity, ri.unit 
-- FROM planned_recipe as pr 
-- LEFT JOIN recipes as r on pr.recipe_id = r.id 
-- LEFT JOIN recipe_ingredient as ri on r.id = ri.recipe_id 
-- LEFT JOIN ingredients as i on ri.ingredient_id = i.id
-- ORDER BY pr.planned_date; -- TODO looks good - to finish

-- SELECT i.name,sum(ri.quantity), ri.unit
-- FROM planned_recipe as pr 
-- LEFT JOIN recipes as r on pr.recipe_id = r.id 
-- LEFT JOIN recipe_ingredient as ri on r.id = ri.recipe_id 
-- LEFT JOIN ingredients as i on ri.ingredient_id = i.id
-- GROUP BY i.name, ri.unit; -- Works like a charm


-- SELECT i.name,sum(ri.quantity), ri.unit
-- FROM planned_recipe as pr 
-- LEFT JOIN recipes as r on pr.recipe_id = r.id 
-- LEFT JOIN recipe_ingredient as ri on r.id = ri.recipe_id 
-- LEFT JOIN ingredients as i on ri.ingredient_id = i.id
-- WHERE pr.planned_date > '2023-11-10 00:00:00'
-- GROUP BY i.name, ri.unit;


SELECT r.`id`, i.`id`, 5, 'units'
FROM `recipes` r
CROSS JOIN `ingredients` i
LIMIT 5;


select * from recipes;



