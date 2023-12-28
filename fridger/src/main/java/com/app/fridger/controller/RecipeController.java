package com.app.fridger.controller;

import com.app.fridger.entity.Recipe;
import com.app.fridger.service.RecipeService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${fridger.request-map}")
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("${fridger.allowed-origins}")
public class RecipeController {
    private final RecipeService recipeService;


    @GetMapping("recipes")
    public List<Recipe> getRecipes() {
        return recipeService.getRecipes();
    }

    @GetMapping("recipes/{id}")
    public Recipe getRecipeDetails(@PathVariable Long id) {
        return recipeService.getRecipeDetails(id);
    }

    @PostMapping("recipes")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createRecipe(@Valid @RequestBody Recipe recipe) {

        HashMap<String, Object> result = new HashMap<>();
        Recipe dbRecipe = recipeService.createRecipe(recipe);

        result.put("message", "Successfully created recipe with id: " + dbRecipe.getId());
        result.put("data", dbRecipe);
        return result;
    }

    @DeleteMapping("recipes/{id}")
    public Map<String, Object> deleteRecipe(@PathVariable Long id) {

        HashMap<String, Object> result = new HashMap<>();
        String message = recipeService.deleteRecipe(id);
        result.put("message", message);

        return result;
    }

    @PutMapping("recipes")
    public Map<String, Object> updateRecipe(@Valid @RequestBody Recipe recipe) {

        HashMap<String, Object> result = new HashMap<>();
        Recipe dbRecipe = recipeService.updateRecipe(recipe);

        result.put("message", "Successfully updated recipe: " + dbRecipe.getName());
        result.put("data", dbRecipe);

        return result;
    }

    @GetMapping("/recipes/favorite")
    public Map<String, Object> getFavoriteRecipes() {
        HashMap<String, Object> result = new HashMap<>();
        List<Recipe> recipes = recipeService.getFavorites();

        result.put("message", "Successfully fetched favorite recipes");
        result.put("data", recipes);

        return result;
    }

    @PutMapping("/recipes/favorite")
    public Map<String, Object> changeFavorite(@Valid @RequestBody Recipe recipe) {

        HashMap<String, Object> result = new HashMap<>();
        Recipe dbRecipe = recipeService.changeFavorites(recipe);

        result.put("message", "Successfully fetched favorite recipes");
        result.put("data", dbRecipe);


        return result;
    }
}
