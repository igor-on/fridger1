package com.app.fridger.service;

import com.app.fridger.model.core.IngredientType;
import com.app.fridger.model.entity.Ingredient;
import com.app.fridger.repo.IngredientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Log4j2
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;


    public Ingredient getOrCreateIngredient(String name, IngredientType type) {
        Optional<Ingredient> optionalIngredient = ingredientRepository.findById(name);

        // if present get from db
        if (optionalIngredient.isPresent()) {
            return optionalIngredient.get();
        }

        // else create new
        Ingredient ingredient = new Ingredient();
        ingredient.setName(name);
        ingredient.setType(type);
        return ingredient;
    }
}
