package com.app.fridger.controller;

import com.app.fridger.dto.ShoppingProduct;
import com.app.fridger.entity.Ingredient;
import com.app.fridger.entity.PlannedRecipe;
import com.app.fridger.entity.Recipe;
import com.app.fridger.entity.RecipeIngredient;
import com.app.fridger.repo.PlannedRecipeRepository;
import com.app.fridger.service.RecipeCalendarService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("${fridger.request-map}")
@RequiredArgsConstructor
@Log4j2
public class RecipeCalendarController {
    private final RecipeCalendarService recipeCalendarService;

    @GetMapping("recipes-calendar")
    public List<PlannedRecipe> getPlannedRecipes() {
        return recipeCalendarService.getPlannedRecipes();
    }

    @PostMapping("recipes-calendar")
    public Map<String, Object> createPlannedRecipe(@Valid @RequestBody PlannedRecipe plannedRecipe) {

        HashMap<String, Object> result = new HashMap<>();
        PlannedRecipe dbPlannedRecipe = recipeCalendarService.createPlannedRecipe(plannedRecipe);

        result.put("message", "Successfully saved planned recipe with id: " + dbPlannedRecipe.getId());
        result.put("data", dbPlannedRecipe);

        return result;
    }

    @DeleteMapping("recipes-calendar/{id}")
    public String deletePlannedRecipe(@PathVariable Long id) {
        return recipeCalendarService.deletePlannedRecipe(id);
    }

    @PutMapping("recipes-calendar")
    public Map<String, Object> updatePlannedRecipe(@Valid @RequestBody PlannedRecipe plannedRecipe) {

        HashMap<String, Object> result = new HashMap<>();
        PlannedRecipe dbPlannedRecipe = recipeCalendarService.updatePlannedRecipe(plannedRecipe);

        result.put("message", "Successfully updated planned recipe with id: " + plannedRecipe.getId());
        result.put("data", dbPlannedRecipe);

        return result;
    }

    @GetMapping("recipes-calendar/ingredients-list")
    public Map<String, Object> getIngredientsListFromPlannedRecipes() {

        HashMap<String, Object> result = new HashMap<>();
        List<ShoppingProduct> ingredientsListFromPlannedRecipes = recipeCalendarService.getIngredientsListFromPlannedRecipes();

        result.put("message", "Successfully obtained ingredients list");
        result.put("data", ingredientsListFromPlannedRecipes);

        return result;
    }

}
