package com.app.fridger.service;

import com.app.fridger.client.SpoonacularClient;
import com.app.fridger.model.api.spoonacular.RecipeInformation;
import com.app.fridger.model.dto.RecipeDTO;
import com.app.fridger.model.entity.Recipe;
import com.app.fridger.model.entity.RecipeIngredient;
import com.app.fridger.model.entity.User;
import com.app.fridger.repo.RecipeRepository;
import com.app.fridger.utils.RecipeMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class RecipeService {

    private final SpoonacularClient spoonacularClient;
    private final RecipeRepository recipeRepository;
    private final IngredientService ingredientService;

    private final RecipeMapper recipeMapper;

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

            ingredientService.handleSettingIngredient(recipeIngredient, recipeIngredient.getIngredient());
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

        dbRecipe.getRecipeIngredients().clear();

        // Populate recipeIngredients from start
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            ingredientService.handleSettingIngredient(recipeIngredient, recipeIngredient.getIngredient());
            dbRecipe.add(recipeIngredient);
        }

        return recipeRepository.save(dbRecipe);
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

    @Transactional
    public List<RecipeDTO> generateRandomRecipes(int number) {
        User user = session.getUser();
        List<String> actualUserRecipes = user.getRecipes().stream().map(Recipe::getName).toList();

        List<RecipeInformation> uniqueRandomRecipes = new ArrayList<>();

        // This code tries to get <number> unique random recipes in 3 API requests or less
        int maxSpoonaRequests = 3; // TODO: change this to spoonacular points
        while (number > 0 && maxSpoonaRequests > 0) {
            List<RecipeInformation> randomRecipes = spoonacularClient.getRandomRecipes(number);
            maxSpoonaRequests -= 1;
            uniqueRandomRecipes.addAll(randomRecipes
                    .stream()
                    .filter(rr -> ( !actualUserRecipes.contains(rr.getTitle()) && !uniqueRandomRecipes.contains(rr)))
                    .toList());
            number -= uniqueRandomRecipes.size();

            log.debug("Successfully fetched: " + uniqueRandomRecipes.size());
        }

        List<Recipe> recipes = new ArrayList<>();
        uniqueRandomRecipes.forEach(urr -> {
            Recipe r = recipeMapper.toEntity(urr);
            r.setUser(user);
            recipeRepository.save(r);
            log.debug("Saved recipe: " + r.getName());
            recipes.add(r);
        });

        return RecipeDTO.fromEntities(recipes);
    }


}
