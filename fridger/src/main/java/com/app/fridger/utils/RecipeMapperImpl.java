package com.app.fridger.utils;

import com.app.fridger.model.api.spoonacular.RecipeInformation;
import com.app.fridger.model.core.Unit;
import com.app.fridger.model.entity.Ingredient;
import com.app.fridger.model.entity.Recipe;
import com.app.fridger.model.entity.RecipeIngredient;
import com.app.fridger.service.FileService;
import com.app.fridger.service.IngredientService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Log4j2
@RequiredArgsConstructor
public class RecipeMapperImpl implements RecipeMapper {

    private final IngredientService ingredientService;
    private final FileService fileService;

    public Recipe toEntity(RecipeInformation recipeInformation) {
        Recipe recipe = new Recipe();
        recipe.setName(recipeInformation.getTitle());
        recipe.setDescription(recipeInformation.getSummary());
        recipe.setInstructions(recipeInformation.getInstructions());
        recipe.setImageUrl(recipeInformation.getImage());
        recipe.setLink(recipeInformation.getSourceUrl());
        recipe.setFavorite(false);


        Map<String, Ingredient> checkedIngredients = new HashMap<>();
        recipeInformation.getExtendedIngredients().forEach(ei -> {
            RecipeIngredient recipeIngredient = new RecipeIngredient();
            if (!checkedIngredients.containsKey(ei.getName())) {
                checkedIngredients.put(ei.getName(), ingredientService.getOrCreateIngredient(ei.getName(), null));
            }
            recipeIngredient.setIngredient(checkedIngredients.get(ei.getName()));

            Unit unit;
            double quantity;
            try {
                log.info("First try - using available units");
                unit = Unit.fromText(ei.getMeasures().getMetric().getUnitShort());
                quantity = ei.getMeasures().getMetric().getAmount();
            } catch (Exception e) {
                try {
                    log.info("Second try - using unit converter");
                    UnitConverter unitConverter = new UnitConverter(ei.getMeasures().getMetric().getUnitShort(), Unit.G);
                    quantity = unitConverter.convert(ei.getMeasures().getMetric().getAmount());
                    unit = Unit.G;
                } catch (Exception ex) {
                    log.error("Provided unit is currently not parsable... fallback to pieces: " + ei.getMeasures().getMetric().getUnitLong());
                    fileService.writeFileToResourceFolder("spoonacular-missing-units.txt", ei.getMeasures().getMetric().getUnitLong());
                    quantity = ei.getMeasures().getMetric().getAmount();
                    unit = Unit.PCS;
                }
            }

            recipeIngredient.setQuantity(quantity);
            recipeIngredient.setUnit(unit);

            recipe.add(recipeIngredient);
        });

        return recipe;
    }
}
