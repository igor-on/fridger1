package com.app.fridger.service;

import com.app.fridger.entity.Fridge;
import com.app.fridger.entity.FridgeIngredient;
import com.app.fridger.repo.FridgeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class FridgeService {

    private final FridgeRepository fridgeRepository;
    private final SessionService session;

    public Fridge getFridge() {
        return fridgeRepository.findById(session.getUser().getUsername()).orElseThrow();
    }



    @Transactional
    // TODO: think about how to prevent updating ingredient object by JPA when id and new name is passed
    public Fridge postIngredients(List<FridgeIngredient> ingredients) {
        Fridge fridge = getFridge();

        ingredients.forEach(fridge::addIngredient);

        fridgeRepository.save(fridge);
        return fridge;
    }


    @Transactional
    public Fridge updateIngredients(List<FridgeIngredient> ingredients) {
        Fridge fridge = getFridge();

        fridge.getFridgeIngredients().clear();
        ingredients.forEach(fridge::addIngredient);

        fridgeRepository.save(fridge);
        return fridge;
    }
}
