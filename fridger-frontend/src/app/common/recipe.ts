export class Recipe {

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public instructions: string,
        public imageUrl: string,
        public link: string,
        public recipeIngredients: RecipeIngredient[]
    ) { }
}

class RecipeIngredient {

    constructor(
        public id: number,
        public quantity: number,
        public unit: string,
        public ingredient: Ingredient
    ) { }
}


class Ingredient {

    constructor(
        public name: string
    ) {}
}