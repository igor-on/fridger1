package com.app.fridger.model.dto;

import com.app.fridger.model.core.Unit;
import com.app.fridger.model.entity.Ingredient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.log4j.Log4j2;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Log4j2
public class IngredientDTO {

    private double quantity;
    private Unit unit;
    private Ingredient ingredient;
}
