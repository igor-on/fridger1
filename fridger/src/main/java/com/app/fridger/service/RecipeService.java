package com.app.fridger.service;

import com.app.fridger.entity.Ingredient;
import com.app.fridger.entity.Recipe;
import com.app.fridger.entity.RecipeIngredient;
import com.app.fridger.repo.IngredientRepository;
import com.app.fridger.repo.RecipeIngredientRepository;
import com.app.fridger.repo.RecipeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;

    public List<Recipe> getRecipes() {
        return recipeRepository.findAll();
    }
    @Transactional
    public String createRecipe(Recipe recipe) {
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            recipeIngredient.setRecipe(recipe); //TODO: test checking if recipeIngredient exists

            handleSettingIngredient(recipeIngredient, recipeIngredient.getIngredient());
        }

        Recipe savedRecipe = recipeRepository.save(recipe);

        return "Successfully saved recipe with id: " + savedRecipe.getId();
    }

    public String deleteRecipe(Long id) {
        recipeRepository.deleteById(id); // TODO: think about error path
        return "Successfully deleted recipe with id: " + id;
    }

    @Transactional
    public String updateRecipe(Recipe recipe) {
        Optional<Recipe> recipeById = recipeRepository.findById(recipe.getId());

        if (recipeById.isPresent()) {
            Recipe dbRecipe = recipeById.get();
            dbRecipe.setName(recipe.getName());
            dbRecipe.setDescription(recipe.getDescription());
            dbRecipe.setInstructions(recipe.getInstructions());
            dbRecipe.setImageUrl(recipe.getImageUrl());
            dbRecipe.setLink(recipe.getLink());

            List<RecipeIngredient> recipeIngredients = recipe.getRecipeIngredients();

            for (RecipeIngredient recipeIngredient : recipeIngredients) {

                Optional<RecipeIngredient> recipeIngredientById = recipeIngredientRepository.findById(recipeIngredient.getId());

                // if present update the data
                if (recipeIngredientById.isPresent()) {
                    RecipeIngredient dbRecipeIngredient = recipeIngredientById.get();
                    log.info("Updating dbRecipeIngredient..." + dbRecipeIngredient.getId());

                    dbRecipeIngredient.setUnit(recipeIngredient.getUnit());
                    dbRecipeIngredient.setQuantity(recipeIngredient.getQuantity());
                    handleSettingIngredient(dbRecipeIngredient, recipeIngredient.getIngredient());
                } else { // else add new data
                    log.info("Adding new recipeIngredient..." + recipeIngredient.getId());
                    handleSettingIngredient(recipeIngredient, recipeIngredient.getIngredient());
                    dbRecipe.add(recipeIngredient);
                }
            }

        } else {
            throw new EmptyResultDataAccessException("Cannot find recipe to update - id: " + recipe.getId(), 1);
        }
        return "Successfully updated recipe with id: " + recipe.getId();
    }

    private void handleSettingIngredient(RecipeIngredient recipeIngredient, Ingredient ingredient) {
        Optional<Ingredient> ingrByName = ingredientRepository.findByName(ingredient.getName());

        // if present update with data from db
        if (ingrByName.isPresent()) {
            Ingredient dbIngredient = ingrByName.get();
            recipeIngredient.setIngredient(dbIngredient);
        } else { // else save new ingredient data
            recipeIngredient.setIngredient(ingredient);
        }
    }
}
