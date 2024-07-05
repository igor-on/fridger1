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
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;

    private final SessionService session;

    public List<Recipe> getRecipes() {
        return recipeRepository.findAll(session.getUser().getUsername());
    }

    @Transactional
    public Recipe createRecipe(Recipe recipe) {

        if (recipe.getId() != 0) {
            throw new IllegalArgumentException("id must be null for new recipes!");
        }
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            recipeIngredient.setRecipe(recipe); //TODO: test checking if recipeIngredient exists

            handleSettingIngredient(recipeIngredient, recipeIngredient.getIngredient());
        }

        Recipe savedRecipe = recipeRepository.save(recipe);
        session.getUser().addRecipe(savedRecipe);

//        return "Successfully saved recipe with id: " + savedRecipe.getId();
        return savedRecipe;
    }

    public String deleteRecipe(Long id) {
        Recipe dbRecipe = recipeRepository.findById(id).orElseThrow();

        if (!dbRecipe.getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

        recipeRepository.delete(dbRecipe); // TODO: think about error path
        return "Successfully deleted recipe with id: " + id;
    }

    @Transactional
    public Recipe updateRecipe(Recipe recipe) {
        Recipe dbRecipe = recipeRepository.findById(recipe.getId()).orElseThrow();

        if (!dbRecipe.getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

        dbRecipe.setName(recipe.getName());
        dbRecipe.setDescription(recipe.getDescription());
        dbRecipe.setInstructions(recipe.getInstructions());
        dbRecipe.setImageUrl(recipe.getImageUrl());
        dbRecipe.setLink(recipe.getLink());
        dbRecipe.setFavorite(recipe.getFavorite());


        List<RecipeIngredient> recipeIngredients = recipe.getRecipeIngredients();
        log.info("Recipe ingredients: " + recipeIngredients);

        List<Long> recipeIngredientsIds = recipeIngredients.stream().map(ri -> ri.getId()).toList();
        List<RecipeIngredient> dbRecipeIngredientsToRemove = dbRecipe.getRecipeIngredients().stream()
                .filter(dbRi -> !recipeIngredientsIds.contains(dbRi.getId()))
                .toList();

        log.info("Db recipe ingredients ro remove: " + dbRecipeIngredientsToRemove);

        // Remove "old" ingredients
        dbRecipeIngredientsToRemove.forEach(dbRi -> {
            log.info("Deleting dbRecipeIngredient..." + dbRi.getId());
            recipeIngredientRepository.delete(dbRi);
        });
        // TODO: is code 71:85 needed?
        dbRecipe.getRecipeIngredients().clear();

        // Populate recipeIngredients from start
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {

            Optional<RecipeIngredient> recipeIngredientById = recipeIngredientRepository.findById(recipeIngredient.getId());

            // if present update the data
            if (recipeIngredientById.isPresent()) {
                RecipeIngredient dbRecipeIngredient = recipeIngredientById.get();
                log.info("Updating dbRecipeIngredient..." + dbRecipeIngredient.getId());

                dbRecipeIngredient.setUnit(recipeIngredient.getUnit());
                dbRecipeIngredient.setQuantity(recipeIngredient.getQuantity());
                handleSettingIngredient(dbRecipeIngredient, recipeIngredient.getIngredient());
                dbRecipe.add(dbRecipeIngredient);
            } else if (recipeIngredient.getId() == 0) { // else add new data
                log.info("Adding new recipeIngredient..." + recipeIngredient.getId());
                handleSettingIngredient(recipeIngredient, recipeIngredient.getIngredient());
                dbRecipe.add(recipeIngredient);
            } else {
                throw new EmptyResultDataAccessException("Cannot find recipe ingredient to update - id: " + recipeIngredient.getId(), 1);
            }
        }


        return recipeRepository.save(dbRecipe);
    }

    private void handleSettingIngredient(RecipeIngredient recipeIngredient, Ingredient ingredient) {
        Optional<Ingredient> ingrByName = ingredientRepository.findByName(ingredient.getName());

        // if present update with data from db
        if (ingrByName.isPresent()) {
            Ingredient dbIngredient = ingrByName.get();
            recipeIngredient.setIngredient(dbIngredient);
        } else { // else save new ingredient data
            log.info("Adding new ingredient...");
            recipeIngredient.setIngredient(ingredient);
        }
    }

    public Recipe getRecipeDetails(Long id) {
        Recipe dbRecipe = recipeRepository.findById(id).orElseThrow();

        if (!dbRecipe.getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

        return dbRecipe;
    }

    public List<Recipe> getFavorites() {
        return recipeRepository.findByFavoriteTrueAndUserUsername(session.getUser().getUsername());
    }

    @Transactional
    public Recipe changeFavorites(Recipe recipe) {
        Recipe dbRecipe = recipeRepository.findById(recipe.getId()).orElseThrow();

        if (!dbRecipe.getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

        dbRecipe.setFavorite(!dbRecipe.getFavorite());
        return dbRecipe;
    }
}
