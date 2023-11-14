package com.app.fridger.service;

import com.app.fridger.dto.ShoppingProduct;
import com.app.fridger.repo.IngredientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class GroceriesService {

    private final IngredientRepository ingredientRepository;

    public List<ShoppingProduct> getIngredientsListFromPlannedRecipes(LocalDateTime startDate, LocalDateTime endDate) {

        List<Object[]> ingredientsListFromPlannedRecipes = ingredientRepository.getIngredientsListFromPlannedRecipes(startDate, endDate);
        List<ShoppingProduct> shoppingProducts = new ArrayList<>();

        for (Object[] v : ingredientsListFromPlannedRecipes) {
            shoppingProducts.add(new ShoppingProduct(v));
        }

        return shoppingProducts;
    }
}
