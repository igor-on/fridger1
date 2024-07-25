package com.app.fridger.controller;

import com.app.fridger.entity.Fridge;
import com.app.fridger.entity.FridgeIngredient;
import com.app.fridger.service.FridgeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("${fridger.request-map}")
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("${fridger.allowed-origins}")
public class FridgeController {

    private final FridgeService fridgeService;


    @GetMapping("fridge")
    public Map<String, Object> getFridge() {

        HashMap<String, Object> result = new HashMap<>();
        Fridge fridge = fridgeService.getFridge();

        result.put("message", "Successfully fetched fridge");
        result.put("data", fridge);


        return result;
    }

    @PostMapping("fridge/ingredients")
    public Map<String, Object> postIngredients(@RequestBody List<FridgeIngredient> ingredients) {
        HashMap<String, Object> result = new HashMap<>();
        Fridge fridge = fridgeService.postIngredients(ingredients);

        result.put("message", "Successfully added ingredients to fridge");
        result.put("data", fridge);

        return result;
    }

    @PutMapping("fridge/ingredients")
    public Map<String, Object> updateIngredients(@RequestBody List<FridgeIngredient> ingredients) {
        HashMap<String, Object> result = new HashMap<>();
        Fridge fridge = fridgeService.updateIngredients(ingredients);

        result.put("message", "Successfully updated ingredients to fridge");
        result.put("data", fridge);

        return result;
    }

    @DeleteMapping("fridge/ingredients/{id}")
    public Map<String, Object> deleteIngredients(@PathVariable Long id) {

        HashMap<String, Object> result = new HashMap<>();
        String message = fridgeService.deleteIngredient(id);
        result.put("message", message);

        return result;
    }

}