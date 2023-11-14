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

    public ShoppingProduct(Object[] obj) {
        this.ingredientName = String.valueOf(obj[0]);
        this.quantity = String.valueOf(obj[1]);
        this.unit = String.valueOf(obj[2]);
    }

    public ShoppingProduct(List<RecipeIngredient> recipeIngredients) {
        this.ingredientName = recipeIngredients.get(0).getIngredient().getName();
        this.quantity = recipeIngredients.stream().map(ri -> String.valueOf(ri.getQuantity())).collect(Collectors.joining(" "));
        this.unit = recipeIngredients.stream().map(RecipeIngredient::getUnit).collect(Collectors.joining(" "));
    }
}
