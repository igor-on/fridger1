-- Inserts for `recipes` with added `username` column
INSERT INTO `recipes` (`name`, `description`, `instructions`, `image_url`, `link`, `favorite`, `username`) VALUES
('Spaghetti Carbonara', 'A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.', 'Cook pasta, fry bacon, mix with eggs and cheese.', 'carbonara.jpg', 'https://example.com/carbonara', true, 'tester'),
('Margherita Pizza', 'Simple pizza with tomatoes, mozzarella cheese, fresh basil, salt, and olive oil.', 'Prepare dough, add toppings, bake.', 'margherita.jpg', 'https://example.com/margherita', false, 'tester'),
('Vegetable Stir Fry', 'Quick and easy stir-fried vegetables.', 'Chop vegetables, stir fry with sauce.', 'stir_fry.jpg', 'https://example.com/stir_fry', false, 'tester'),
('Beef Stew', 'Hearty beef stew with vegetables.', 'Brown beef, add vegetables and broth, simmer.', 'beef_stew.jpg', 'https://example.com/beef_stew', true, 'tester'),
('Chicken Curry', 'Spicy chicken curry with coconut milk.', 'Cook chicken, add spices and coconut milk.', 'chicken_curry.jpg', 'https://example.com/chicken_curry', false, 'tester'),
('Quinoa Salad', 'Healthy quinoa salad with vegetables.', 'Cook quinoa, mix with chopped vegetables and dressing.', 'quinoa_salad.jpg', 'https://example.com/quinoa_salad', true, 'macko'),
('Pancakes', 'Fluffy pancakes with maple syrup.', 'Mix batter, cook on griddle, serve with syrup.', 'pancakes.jpg', 'https://example.com/pancakes', false, 'macko'),
('Fish Tacos', 'Tacos with grilled fish and fresh salsa.', 'Grill fish, prepare salsa, assemble tacos.', 'fish_tacos.jpg', 'https://example.com/fish_tacos', true, 'macko'),
('Lentil Soup', 'Warm and comforting lentil soup.', 'Cook lentils with vegetables and broth.', 'lentil_soup.jpg', 'https://example.com/lentil_soup', false, 'macko'),
('Chocolate Cake', 'Rich and moist chocolate cake.', 'Mix ingredients, bake, frost with chocolate icing.', 'chocolate_cake.jpg', 'https://example.com/chocolate_cake', true, 'macko');

-- Inserts for `ingredients`
INSERT INTO `ingredients` (`name`, `type`) VALUES
('Pasta', 'DRY'),
('Bacon', 'MEAT'),
('Eggs', 'DAIRY'),
('Cheese', 'DAIRY'),
('Tomatoes', 'OTHER'),
('Mozzarella', 'DAIRY'),
('Basil', 'OTHER'),
('Beef', 'MEAT'),
('Chicken', 'MEAT'),
('Quinoa', 'MEAT');

-- Inserts for `recipe_ingredient` (Assuming recipe_id and ingredient_id start from 1 and match the order of inserts)
INSERT INTO `recipe_ingredient` (`recipe_id`, `ingredient_name`, `quantity`, `unit`) VALUES
(1, 'Pasta', 100, 'g'),
(1, 'Bacon', 50, 'g'),
(1, 'Eggs', 2, 'pcs'),
(2, 'Tomatoes', 3, 'pcs'),
(2, 'Mozzarella', 100, 'g'),
(3, 'Beef', 200, 'g'),
(4, 'Chicken', 300, 'g'),
(5, 'Beef', 250, 'g'),
(6, 'Quinoa', 150, 'g'),
(7, 'Eggs', 3, 'pcs');

-- Inserts for `planned_recipe` (Assuming recipe_id starts from 1)
INSERT INTO `planned_recipe` (`recipe_id`, `planned_date`, `done`) VALUES
(1, '2023-04-10 00:00:00', false),
(2, '2023-04-11 00:00:00', true),
(3, '2023-04-12 00:00:00', false),
(4, '2023-04-13 00:00:00', true),
(5, '2023-04-14 00:00:00', false),
(6, '2023-04-15 00:00:00', true),
(7, '2023-04-16 00:00:00', false),
(8, '2023-04-17 00:00:00', true),
(9, '2023-04-18 00:00:00', false),
(10, '2023-04-19 00:00:00', true);

-- Inserts for `groceries_lists` with added `username` column
INSERT INTO `groceries_lists` (`start_date`, `end_date`, `username`, `with_fridge`) VALUES
('2023-04-01 00:00:00', '2023-04-07 00:00:00', 'tester', false),
('2023-04-08 00:00:00', '2023-04-14 00:00:00', 'tester', false),
('2023-04-15 00:00:00', '2023-04-21 00:00:00', 'tester', false),
('2023-04-22 00:00:00', '2023-04-28 00:00:00', 'tester', false),
('2023-04-29 00:00:00', '2023-05-05 00:00:00', 'tester', false),
('2023-05-06 00:00:00', '2023-05-12 00:00:00', 'macko', false),
('2023-05-13 00:00:00', '2023-05-19 00:00:00', 'macko', false),
('2023-05-20 00:00:00', '2023-05-26 00:00:00', 'macko', false),
('2023-05-27 00:00:00', '2023-06-02 00:00:00', 'macko', false),
('2023-06-03 00:00:00', '2023-06-09 00:00:00', 'macko', false);

-- Inserts for `groceries_list_ingredient` (Assuming groceries_list_id and ingredient_id start from 1)
INSERT INTO `groceries_list_ingredient` (`groceries_list_id`, `ingredient_name`, `quantity`, `unit`) VALUES
(1, 'Pasta', 500, 'g'),
(2, 'Bacon', 300, 'g'),
(3, 'Eggs', 12, 'pcs'),
(4, 'Mozzarella', 200, 'g'),
(5, 'Tomatoes', 15, 'pcs'),
(6, 'Beef', 400, 'g'),
(7, 'Chicken', 20, 'pcs'),
(8, 'Cheese', 600, 'g'),
(9,'Basil', 500, 'g'),
(10, 'Quinoa', 300, 'g');

INSERT INTO `fridges` (`username`, `name`) VALUES ('tester', 'My fridge');
INSERT INTO `fridges` (`username`, `name`) VALUES ('macko', 'House');

INSERT INTO `fridge_ingredient` (`fridge_id`, `ingredient_name`, `quantity`, `unit`, `expiration_date`, `insert_date`) 
VALUES ('tester', 'Bacon', 1, 'kg', '2023-12-31 23:59:59', '2023-10-31 23:59:59');

INSERT INTO `fridge_ingredient` (`fridge_id`, `ingredient_name`, `quantity`, `unit`, `expiration_date`, `insert_date`) 
VALUES ('tester', 'Pasta', 2, 'liters', '2023-11-30 23:59:59', '2023-10-31 23:59:59');

INSERT INTO `fridge_ingredient` (`fridge_id`, `ingredient_name`, `quantity`, `unit`, `expiration_date`, `insert_date`) 
VALUES ('macko', 'Tomatoes', 3, 'pieces', '2023-10-31 23:59:59', '2023-10-31 23:59:59');