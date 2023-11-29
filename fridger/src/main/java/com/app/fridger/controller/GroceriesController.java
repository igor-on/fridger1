package com.app.fridger.controller;

import com.app.fridger.dto.ShoppingProduct;
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
@Log4j2
@RequiredArgsConstructor
@CrossOrigin("${fridger.allowed-origins}")
public class GroceriesController {

    private final GroceriesService groceriesService;

    @GetMapping("groceries/ingredients-list")
    public Map<String, Object> getIngredientsListFromPlannedRecipes(@RequestParam LocalDateTime startDate, @RequestParam LocalDateTime endDate) {
        HashMap<String, Object> result = new HashMap<>();
        List<ShoppingProduct> shoppingProducts = groceriesService.getIngredientsListFromPlannedRecipes(startDate, endDate);

        result.put("message", "Successfully obtained groceries list");
        result.put("data", shoppingProducts);

        return result;
    }
}
