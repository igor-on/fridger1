package com.app.fridger.service;

import com.app.fridger.entity.Fridge;
import com.app.fridger.entity.FridgeIngredient;
import com.app.fridger.entity.Ingredient;
import com.app.fridger.model.IngredientType;
import com.app.fridger.repo.FridgeIngredientRepository;
import com.app.fridger.repo.FridgeRepository;
import com.app.fridger.repo.IngredientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class FridgeService {
    private final FridgeRepository fridgeRepository;
    private final FridgeIngredientRepository fridgeIngredientRepository;

    private final IngredientRepository ingredientRepository;
    private final SessionService session;

    public Fridge getFridge() {
        return fridgeRepository.findById(session.getUser().getUsername()).orElseThrow();
    }



    @Transactional
    // TODO: think about how to prevent updating ingredient object by JPA when id and new name is passed
    public Fridge postIngredients(List<FridgeIngredient> ingredients) {
        log.info("PostIngredients:" + ingredients.toString() );
        Fridge fridge = getFridge();

        ingredients.forEach(i -> {
            handleSettingIngredient(i);
            fridge.addIngredient(i);
        });

        fridgeRepository.save(fridge);
        return fridge;
    }


    @Transactional
    public Fridge updateIngredients(List<FridgeIngredient> ingredients) {
        Fridge fridge = getFridge();

        fridge.getFridgeIngredients().clear();
        ingredients.forEach(i -> {
            handleSettingIngredient(i);
            fridge.addIngredient(i);
        });

        fridgeRepository.save(fridge);
        return fridge;
    }

    // TODO: temporary solution - think about how to deal with ingredients
    private void handleSettingIngredient(FridgeIngredient fridgeIngredient) {
        Optional<Ingredient> ingrByName = ingredientRepository.findById(fridgeIngredient.getIngredient().getName());

        // if present update with data from db
        if (ingrByName.isPresent()) {
            Ingredient dbIngredient = ingrByName.get();
            fridgeIngredient.setIngredient(dbIngredient);
        } else { // else save new ingredient data
            log.info("Adding new ingredient...");
            fridgeIngredient.getIngredient().setType(IngredientType.OTHER);
        }
    }

    public String deleteIngredient(Long id) {
        FridgeIngredient ingredient = fridgeIngredientRepository.findById(id).orElseThrow();

        if (!ingredient.getFridge().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access denied");
        }

        fridgeIngredientRepository.deleteById(ingredient.getId());
        return "Successfully deleted fridge ingredient with id: " + id;
    }
}
