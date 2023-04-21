package com.app.fridger.controller;

import com.app.fridger.entity.Recipe;
import com.app.fridger.service.RecipeService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public String createRecipe(@Valid @RequestBody Recipe recipe) {
        return recipeService.createRecipe(recipe);
    }

    @DeleteMapping("recipes/{id}")
    public String deleteRecipe(@PathVariable Long id) {
        return recipeService.deleteRecipe(id);
    }

    @PutMapping("recipes")
    public String updateRecipe(@Valid @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(recipe);
    }
}
