package com.app.fridger.controller;

import com.app.fridger.dto.ShoppingProduct;
import com.app.fridger.entity.GroceriesList;
import com.app.fridger.entity.GroceriesListIngredient;
import com.app.fridger.repo.GroceriesListRepository;
import com.app.fridger.repo.IngredientRepository;
import com.app.fridger.service.GroceriesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${fridger.request-map}")
@RequiredArgsConstructor
@CrossOrigin("${fridger.allowed-origins}")
@Log4j2
public class GroceriesController {

    private final GroceriesService groceriesService;

    @GetMapping("groceries/ingredients-list")
    public Map<String, Object> generateIngredientsListFromPlannedRecipes(@RequestParam LocalDateTime startDate, @RequestParam LocalDateTime endDate) {
        HashMap<String, Object> result = new HashMap<>();
        List<ShoppingProduct> shoppingProducts = groceriesService.generateIngredientsListFromPlannedRecipes(startDate, endDate);

        result.put("message", "Successfully generated groceries list");
        result.put("data", shoppingProducts);

        return result;
    }

    @DeleteMapping("groceries/list/{id}")
    public Map<String, Object> getGroceriesList(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();

        groceriesService.deleteGroceriesList(id);
        result.put("message", "Successfully deleted groceries list with id: " + id);

        return result;
    }

    @GetMapping("groceries/list")
    public Map<String, Object> getGroceriesList() {
        Map<String, Object> result = new HashMap<>();
        result.put("data", groceriesService.getGroceriesLists());
        result.put("message", "Successfully obtained groceries lists");

        return result;
    }
}
