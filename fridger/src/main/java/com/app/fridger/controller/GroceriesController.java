package com.app.fridger.controller;

import com.app.fridger.dto.GroceriesListDTO;
import com.app.fridger.service.GroceriesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("${fridger.request-map}")
@RequiredArgsConstructor
@CrossOrigin("${fridger.allowed-origins}")
@Log4j2
public class GroceriesController {

    private final GroceriesService groceriesService;

    @GetMapping("groceries-list/generate")
    public Map<String, Object> generateGroceriesList(@RequestParam LocalDateTime startDate, @RequestParam LocalDateTime endDate, @RequestParam boolean withFridge) {
        HashMap<String, Object> result = new HashMap<>();
        GroceriesListDTO groceriesListDTO = groceriesService.generateGroceriesList(startDate, endDate, withFridge);

        result.put("message", "Successfully generated groceries list");
        result.put("data", groceriesListDTO);

        return result;
    }

    // TODO: change path to groceries-list

    @DeleteMapping("groceries-list/{id}")
    public Map<String, Object> deleteGroceriesList(@PathVariable Long id) {
        Map<String, Object> result = new HashMap<>();

        groceriesService.deleteGroceriesList(id);
        result.put("message", "Successfully deleted groceries list with id: " + id);

        return result;
    }

    @GetMapping("groceries-list")
    public Map<String, Object> getGroceriesList() {
        Map<String, Object> result = new HashMap<>();
        result.put("data", groceriesService.getGroceriesLists());
        result.put("message", "Successfully obtained groceries lists");

        return result;
    }
}
