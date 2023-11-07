package com.app.fridger.controller;

import com.app.fridger.dto.ShoppingProduct;
import com.app.fridger.service.GroceriesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${fridger.request-map}")
@Log4j2
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class GroceriesController {

    private final GroceriesService groceriesService;

    @GetMapping("groceries/ingredients-list")
    public Map<String, Object> getIngredientsListFromPlannedRecipes() {
        HashMap<String, Object> result = new HashMap<>();
        List<ShoppingProduct> shoppingProducts = groceriesService.getIngredientsListFromPlannedRecipes();

        result.put("message", "Successfully obtained groceries list");
        result.put("data", shoppingProducts);

        return result;
    }
}
