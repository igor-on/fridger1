package com.app.fridger.utils;

import com.app.fridger.model.api.spoonacular.RecipeInformation;
import com.app.fridger.model.core.IngredientType;
import com.app.fridger.model.core.Unit;
import com.app.fridger.model.entity.Ingredient;
import com.app.fridger.model.entity.Recipe;
import com.app.fridger.model.entity.RecipeIngredient;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class RecipeMapper {


    private RecipeMapper() {}

//    public static Recipe toEntity(RecipeInformation recipeInformation) {
//        Recipe recipe = new Recipe();
//        recipe.setName(recipeInformation.getTitle());
//        recipe.setDescription(recipeInformation.getSummary().substring(0, 250)); // TODO - temporary solution
//        recipe.setInstructions(recipeInformation.getInstructions());
//        recipe.setImageUrl(recipeInformation.getImage());
//        recipe.setLink(recipeInformation.getSourceUrl());
//        recipe.setFavorite(false);
//
//        recipeInformation.getExtendedIngredients().forEach(ei -> {
//            RecipeIngredient ingredient = new RecipeIngredient();
//
//            Ingredient name = new Ingredient();
//            name.setName(ei.getName());
//            name.setType(IngredientType.OTHER);
//            ingredient.setIngredient(name);
//            ingredient.setQuantity(ei.getAmount());
//            ingredient.setUnit(Unit.fromTextWithFallback(ei.getUnit()));
//
//            recipe.add(ingredient);
//        });
//
//        return recipe;
//    }
}
