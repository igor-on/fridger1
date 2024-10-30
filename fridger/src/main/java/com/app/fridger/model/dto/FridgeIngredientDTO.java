package com.app.fridger.model.dto;

import com.app.fridger.model.entity.Fridge;
import com.app.fridger.model.entity.FridgeIngredient;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@ToString
public class FridgeIngredientDTO extends IngredientDTO {
    private LocalDateTime expirationDate;
    private Fridge fridge;

    public FridgeIngredientDTO(FridgeIngredient ingredient) {
        super(ingredient.getQuantity(), ingredient.getUnit(), ingredient.getIngredient());
        this.expirationDate = ingredient.getExpirationDate();
        this.fridge = ingredient.getFridge();
    }

    public FridgeIngredientDTO(List<FridgeIngredient> ingredients) {
        super(ingredients.stream().map(FridgeIngredient::getQuantity).reduce(0d, Double::sum), ingredients.get(0).getUnit(), ingredients.get(0).getIngredient());

        if (ingredients.size() == 0) {
            throw new IllegalArgumentException("Ingredients passed to constructor are empty!");
        }
        if (ingredients.stream().map(FridgeIngredient::getUnit).distinct().toList().size() != 1) {
            throw new IllegalArgumentException("Ingredients passed to constructor have different units and couldn't be merged!");
        }

        this.expirationDate = ingredients.stream().map(FridgeIngredient::getExpirationDate).filter(Objects::nonNull).max(LocalDateTime::compareTo).orElse(null);
        this.fridge = ingredients.get(0).getFridge();
    }
}
