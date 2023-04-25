package com.app.fridger.dto;

import com.app.fridger.entity.RecipeIngredient;
import lombok.Data;
import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Log4j2
public class ShoppingProduct {
    private String ingredientName;
    private String quantity;
    private String unit;


    public ShoppingProduct(RecipeIngredient recipeIngredient) {
        this.ingredientName = recipeIngredient.getIngredient().getName();
        this.quantity = String.valueOf(recipeIngredient.getQuantity());
        this.unit = String.valueOf(recipeIngredient.getUnit());
    }

    public ShoppingProduct(List<RecipeIngredient> recipeIngredients) {
        this.ingredientName = recipeIngredients.get(0).getIngredient().getName();
        this.quantity = recipeIngredients.stream().map(ri -> String.valueOf(ri.getQuantity())).collect(Collectors.joining(" "));
        this.unit = recipeIngredients.stream().map(RecipeIngredient::getUnit).collect(Collectors.joining(" "));
    }
}
