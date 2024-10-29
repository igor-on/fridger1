package com.app.fridger.service;

import com.app.fridger.model.core.IngredientType;
import com.app.fridger.model.entity.Ingredient;
import com.app.fridger.model.entity.RecipeIngredient;
import com.app.fridger.repo.IngredientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;


    public Ingredient getOrCreateIngredient(String name, IngredientType type) {
        Optional<Ingredient> optionalIngredient = ingredientRepository.findById(name);

        // if present get from db
        if (optionalIngredient.isPresent()) {
            return optionalIngredient.get();
        }

        // else create new
        Ingredient ingredient = new Ingredient();
        ingredient.setName(name);
        ingredient.setType(type);
        return ingredient;
    }

    @Deprecated
    public void handleSettingIngredient(RecipeIngredient recipeIngredient, Ingredient ingredient) {
        log.info("Checking ingredient if exits: " + ingredient.getName());

        Optional<Ingredient> ingrByName = ingredientRepository.findByName(ingredient.getName());

        // if present update with data from db
        if (ingrByName.isPresent()) {
            log.info("Exists! updateing from db...");
            Ingredient dbIngredient = ingrByName.get();
            recipeIngredient.setIngredient(dbIngredient);
        } else { // else save new ingredient data
            log.info("Doesn't exists! Adding new ingredient...");
            if (ingredient.getType() == null) {
                ingredient.setType(IngredientType.OTHER);
            }
            recipeIngredient.setIngredient(ingredient);
        }
    }
}
