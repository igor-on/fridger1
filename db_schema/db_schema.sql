DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS planned_recipe;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS ingredients;


CREATE TABLE IF NOT EXISTS `recipes` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(55) NOT NULL,
  `description` varchar(255),
  `instructions` varchar(255) NOT NULL,
  `image_url` varchar(255),
  `link` varchar(255)
);

CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS `recipe_ingredient` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` bigint NOT NULL,
  `ingredient_id` integer NOT NULL,
  `quantity` integer NOT NULL,
  `unit` varchar(255) NOT NULL,
  CONSTRAINT FK_recipe_ingredient FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
);

CREATE TABLE IF NOT EXISTS `planned_recipe` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` bigint NOT NULL,
  `planned_date` date NOT NULL,
  `done` boolean,
  CONSTRAINT FK_planned_recipe FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
);

-- ALTER TABLE `recipe_ingredient` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

-- ALTER TABLE `planned_recipe` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);