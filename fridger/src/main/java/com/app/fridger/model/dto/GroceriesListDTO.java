package com.app.fridger.model.dto;

import com.app.fridger.model.entity.GroceriesList;
import com.app.fridger.model.entity.GroceriesListFridgeIngredient;
import com.app.fridger.model.entity.GroceriesListIngredient;
import com.app.fridger.model.core.Unit;
import lombok.*;
import lombok.extern.log4j.Log4j2;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Log4j2
public class GroceriesListDTO {

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<IngredientDTO> ingredients;

    private List<IngredientDTO> fridgeIngredients;

    private boolean withFridge;

    private LocalDateTime fridgeStateDate;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class IngredientDTO {
        private String ingredientName;
        private double quantity;
        private Unit unit;
    }

    @Getter
    @Setter
    @ToString(callSuper = true)
    public static class IngredientExtDTO extends IngredientDTO {
        private LocalDateTime expirationDate;

        public IngredientExtDTO(String ingredientName, double quantity, Unit unit, LocalDateTime expirationDate) {
            super(ingredientName, quantity, unit);
            this.expirationDate = expirationDate;
        }
    }

    public GroceriesListDTO(GroceriesList groceriesList) {
        this.startDate = groceriesList.getStartDate();
        this.endDate = groceriesList.getEndDate();
        this.withFridge = groceriesList.isWithFridge();
        this.fridgeStateDate = groceriesList.getFridgeStateDate();

        this.ingredients = new ArrayList<>();
        this.fridgeIngredients = new ArrayList<>();
        for (GroceriesListIngredient gli : groceriesList.getIngredients()) {
            this.ingredients.add(new IngredientDTO(gli.getIngredient().getName(), gli.getQuantity(), gli.getUnit()));

        }

        if (groceriesList.getFridgeIngredients() != null) {
            for (GroceriesListFridgeIngredient glfi : groceriesList.getFridgeIngredients()) {
                this.fridgeIngredients.add(new IngredientExtDTO(glfi.getIngredient().getName(), glfi.getQuantity(), glfi.getUnit(), glfi.getExpirationDate()));
            }
        }

    }
}
