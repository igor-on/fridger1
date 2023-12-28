DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS planned_recipe;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS ingredients;


CREATE TABLE IF NOT EXISTS `recipes` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(55) NOT NULL UNIQUE,
  `description` varchar(255),
  `instructions` varchar(255) NOT NULL,
  `image_url` varchar(255),
  `link` varchar(255),
  `favorite` boolean
);

CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS `recipe_ingredient` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `recipe_id` bigint NOT NULL,
  `ingredient_id` bigint NOT NULL,
  `quantity` integer NOT NULL,
  `unit` varchar(255) NOT NULL,
  CONSTRAINT FK_recipe_ingredient FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT FK_ingredient_recipe_ingredient FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
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
`end_date` datetime NOT NULL
);

CREATE TABLE IF NOT EXISTS `groceries_list_ingredient` (
`id` bigint PRIMARY KEY AUTO_INCREMENT,
`groceries_list_id` bigint NOT NULL,
`ingredient_id` bigint NOT NULL,
`quantity` int NOT NULL,
`unit` varchar(255) NOT NULL,
  CONSTRAINT FK_groceries_list_ingredient FOREIGN KEY (`groceries_list_id`) REFERENCES `groceries_lists` (`id`),
  CONSTRAINT FK_ingredient_groceries_list_ingredient FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
);

-- ALTER TABLE `recipe_ingredient` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

-- ALTER TABLE `planned_recipe` ADD FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`);

-- use fridger_db;
-- SELECT * FROM planned_recipe;
-- select * from recipes;
-- select * from ingredients;
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

