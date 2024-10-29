package com.app.fridger.controller;

import com.app.fridger.client.SpoonacularClient;
import com.app.fridger.exceptions.TooBigNumberException;
import com.app.fridger.model.api.spoonacular.generated.RecipeInformation;
import com.app.fridger.model.dto.RecipeDTO;
import com.app.fridger.model.entity.Recipe;
import com.app.fridger.service.RecipeService;
import com.app.fridger.utils.Utils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final SpoonacularClient spoonacularClient;


    // TODO: think about sending it in data & message format as others
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

    @GetMapping("/recipes/random")
    public ResponseEntity<Object> getRandomRecipes(HttpServletRequest req, @RequestParam int number) {
        try {
            HashMap<String, Object> result = new HashMap<>();
            List<RecipeDTO> recipes = recipeService.generateRandomRecipes(number);

            String message = recipes.size() == number
                    ? "Successfully generated random recipes"
                    : "Unfortunately, we encountered some problems during finding for you " + number + " unique recipe, we only managed to get " + recipes.size() + " for You";

            result.put("message", message);
            result.put("data", recipes);
            return ResponseEntity.ok(result);
        } catch (TooBigNumberException e) {
            return Utils.createErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), req);
        }
    }

    @GetMapping("/recipes/spoonacular/search")
    public Object getRecipesComplexSearch(@RequestParam String query) {

        List<RecipeInformation> recipeInformations = spoonacularClient.recipeComplexSearch(query);

        return recipeInformations;
    }
}
