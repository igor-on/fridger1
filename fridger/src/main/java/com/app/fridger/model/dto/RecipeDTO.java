package com.app.fridger.model.dto;


import com.app.fridger.model.entity.Recipe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Log4j2
public class RecipeDTO {

    private long id;
    private String name;
    private String description;
    private String instructions;
    private String imageUrl;
    private String link;
    private boolean favorite;
    private List<IngredientDTO> ingredients;


    public static RecipeDTO fromEntity(Recipe recipe) {
        List<IngredientDTO> ingredients = recipe.getRecipeIngredients()
                .stream()
                .map(ri -> new IngredientDTO(ri.getQuantity(), ri.getUnit(), ri.getIngredient()))
                .toList();

        return new RecipeDTO(recipe.getId(),
                recipe.getName(),
                recipe.getDescription(),
                recipe.getInstructions(),
                recipe.getImageUrl(),
                recipe.getLink(),
                recipe.getFavorite(),
                ingredients);
    }

    public static List<RecipeDTO> fromEntities(List<Recipe> recipes) {
        return recipes.stream()
                .map(RecipeDTO::fromEntity)
                .toList();
    }
}
