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
public class RecipeController {
    private final RecipeService recipeService;


    @GetMapping("recipes")
    public List<Recipe> getRecipes() {
        return recipeService.getRecipes();
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
    public String deleteRecipe(@PathVariable Long id) {
        return recipeService.deleteRecipe(id);
    }

    @PutMapping("recipes")
    public Map<String, Object> updateRecipe(@Valid @RequestBody Recipe recipe) {

        HashMap<String, Object> result = new HashMap<>();
        Recipe dbRecipe = recipeService.updateRecipe(recipe);

        result.put("message", "Successfully updated recipe with id: " + dbRecipe.getId());
        result.put("data", dbRecipe);

        return result;
    }
}
