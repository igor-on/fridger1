package com.app.fridger.service;

import com.app.fridger.dto.ShoppingProduct;
import com.app.fridger.entity.GroceriesList;
import com.app.fridger.entity.GroceriesListIngredient;
import com.app.fridger.repo.GroceriesListRepository;
import com.app.fridger.repo.IngredientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class GroceriesService {

    private final IngredientRepository ingredientRepository;
    private final GroceriesListRepository groceriesListRepository;

    private final SessionService session;

    public List<ShoppingProduct> generateIngredientsListFromPlannedRecipes(LocalDateTime startDate, LocalDateTime endDate) {
        List<Object[]> ingredientsListFromPlannedRecipes = ingredientRepository.getIngredientsListFromPlannedRecipes(startDate, endDate, session.getUser().getUsername());
        List<ShoppingProduct> shoppingProducts = new ArrayList<>();

        GroceriesList groceriesList = new GroceriesList();
        groceriesList.setStartDate(startDate);
        groceriesList.setEndDate(endDate);
        for (Object[] v : ingredientsListFromPlannedRecipes) {
            String ingrName = String.valueOf(v[0]);
            int quantity = Integer.parseInt(String.valueOf(v[1]));
            String unit = String.valueOf(v[2]);
            GroceriesListIngredient groceriesListIngredient = new GroceriesListIngredient();
            groceriesListIngredient.setIngredient(ingredientRepository.findByName(ingrName).orElseThrow());
            groceriesListIngredient.setQuantity(quantity);
            groceriesListIngredient.setUnit(unit);
            groceriesList.add(groceriesListIngredient);

            shoppingProducts.add(new ShoppingProduct(v));
        }

        groceriesListRepository.save(groceriesList);
        return shoppingProducts;
    }

    public List<GroceriesList> getGroceriesLists() {

        return groceriesListRepository.findByUserUsername(session.getUser().getUsername());
    }

    public List<ShoppingProduct> getIngredientsListFromPlannedRecipes(LocalDateTime startDate, LocalDateTime endDate) {

        List<Object[]> ingredientsListFromPlannedRecipes = ingredientRepository.getIngredientsListFromPlannedRecipes(startDate, endDate, session.getUser().getUsername());
        List<ShoppingProduct> shoppingProducts = new ArrayList<>();

        for (Object[] v : ingredientsListFromPlannedRecipes) {
            shoppingProducts.add(new ShoppingProduct(v));
        }

        return shoppingProducts;
    }

    @Transactional
    public void deleteGroceriesList(Long id) {
        GroceriesList dbGroceriesList = groceriesListRepository.findById(id).orElseThrow();

        if (!dbGroceriesList.getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        } // TODO: move validation code to separate method/class, maybe facade


        groceriesListRepository.deleteById(id);
    }
}
