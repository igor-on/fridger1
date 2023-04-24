INSERT INTO recipes 
VALUES 
	(1, 'pancakes', 'easy meal for every breakfast', '1. Buy 2. Make 3. Eat', 'https://d3iamf8ydd24h9.cloudfront.net/pictures/articles/2019/08/1066536-v-1500x1500.jpg', 'https://aniagotuje.pl/przepis/jak-zrobic-ciasto-na-nalesniki'),
    (2, 'cornflakes', 'VERY easy meal for every breakfast', '1. Buy 2. Make 3. Eat', 'https://www.carrefour.pl/images/product/org/nestle-corn-flakes-sniadaniowe-platki-kukurydziane-45-g-m1fcq2.jpg', 'https://aniagotuje.pl/przepis/jak-zrobic-ciasto-na-nalesniki');


INSERT INTO ingredients
VALUES 
   (1, 'milk'),
   (2, 'flour'),
   (3, 'egg'),
   (4, 'water'),
   (5, 'cornflakes');


 INSERT INTO recipe_ingredient 
 VALUES 
 	(1, 1, 1, 250, 'ml'),
 	(2, 1, 4, 150, 'ml'),
 	(3, 1, 2, 500, 'g'),
 	(4, 1, 3, 2, 'whole'),
    (5, 2, 1, 500, 'ml'),
 	(6, 2, 5, 300, 'g');