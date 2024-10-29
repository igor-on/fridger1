package com.app.fridger.utils;

import com.app.fridger.model.api.spoonacular.generated.RecipeInformation;
import com.app.fridger.model.entity.Recipe;

public interface RecipeMapper {

    Recipe toEntity(RecipeInformation recipeInformation);
}
