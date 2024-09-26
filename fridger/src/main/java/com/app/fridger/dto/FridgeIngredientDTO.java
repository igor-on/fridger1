package com.app.fridger.dto;

import com.app.fridger.entity.Fridge;
import com.app.fridger.entity.FridgeIngredient;
import com.app.fridger.entity.Ingredient;
import com.app.fridger.model.Unit;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
public class FridgeIngredientDTO {

    private double quantity;
    private Unit unit;
    private LocalDateTime expirationDate;
    private Ingredient ingredient;
    private Fridge fridge;

    public FridgeIngredientDTO(FridgeIngredient ingredient) {
        this.quantity = ingredient.getQuantity();
        this.unit = ingredient.getUnit();
        this.expirationDate = ingredient.getExpirationDate();
        this.ingredient = ingredient.getIngredient();
        this.fridge = ingredient.getFridge();
    }

    public FridgeIngredientDTO(List<FridgeIngredient> ingredients) {
        if (ingredients.size() == 0) {
            throw new IllegalArgumentException("Ingredients passed to constructor are empty!");
        }
        if (ingredients.stream().map(FridgeIngredient::getUnit).distinct().toList().size() != 1) {
            throw new IllegalArgumentException("Ingredients passed to constructor have different units and couldn't be merged!");
        }
        this.quantity = ingredients.stream().map(FridgeIngredient::getQuantity).reduce(0d, Double::sum);
        this.unit = ingredients.get(0).getUnit();
        this.expirationDate = ingredients.stream().map(FridgeIngredient::getExpirationDate).filter(Objects::nonNull).max(LocalDateTime::compareTo).orElse(null);
        this.ingredient = ingredients.get(0).getIngredient();
        this.fridge = ingredients.get(0).getFridge();
    }
}
