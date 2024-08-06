package com.app.fridger.dto;

import com.app.fridger.entity.GroceriesList;
import com.app.fridger.entity.GroceriesListIngredient;
import com.app.fridger.model.Unit;
import lombok.AllArgsConstructor;
import lombok.Data;
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


    @Data
    @AllArgsConstructor
    public static class IngredientDTO {
        private String ingredientName;
        private double quantity;
        private Unit unit;
    }

    public GroceriesListDTO(GroceriesList groceriesList) {
        this.startDate = groceriesList.getStartDate();
        this.endDate = groceriesList.getEndDate();

        ingredients = new ArrayList<>();
        for (GroceriesListIngredient gli : groceriesList.getGroceriesListIngredient()) {
            ingredients.add(new IngredientDTO(gli.getIngredient().getName(), gli.getQuantity(), gli.getUnit()));

        }

    }
}
