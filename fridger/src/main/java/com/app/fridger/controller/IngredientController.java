package com.app.fridger.controller;

import com.app.fridger.client.SpoonacularClient;
import com.app.fridger.model.api.spoonacular.generated.IngredientInformation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${fridger.request-map}")
@CrossOrigin("${fridger.allowed-origins}")
@Log4j2
@RequiredArgsConstructor
public class IngredientController {

    private final SpoonacularClient spoonacularClient;

    @GetMapping("ingredients/spoonacular/autocomplete")
    public List<IngredientInformation> getIngredientsAutocomplete(@RequestParam String query) {
        return spoonacularClient.ingredientAutocompleteSearch(query);
    }
}
