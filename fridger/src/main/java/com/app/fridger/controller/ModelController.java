package com.app.fridger.controller;

import com.app.fridger.model.IngredientType;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("${fridger.request-map}")
@RequiredArgsConstructor
@Log4j2
@CrossOrigin("${fridger.allowed-origins}")
public class ModelController {

    @GetMapping("/ingredient-types")
    public List<IngredientType> getIngredientTypes() {
        return Arrays.stream(IngredientType.values()).toList();
    }
}
