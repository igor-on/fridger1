package com.app.fridger.service;

import com.app.fridger.dto.FridgeIngredientDTO;
import com.app.fridger.entity.Fridge;
import com.app.fridger.entity.FridgeIngredient;
import com.app.fridger.entity.Ingredient;
import com.app.fridger.model.IngredientType;
import com.app.fridger.model.Unit;
import com.app.fridger.repo.FridgeIngredientRepository;
import com.app.fridger.repo.FridgeRepository;
import com.app.fridger.repo.IngredientRepository;
import com.app.fridger.utils.UnitConverter;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
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


    public Optional<FridgeIngredientDTO> getIngredientByName(String name) {
        // TODO: now there can be more than one fridge ingrs with the same name - think about how to stack these
        List<FridgeIngredient> ingrsByName = getFridge().getFridgeIngredients().stream().filter(i -> name.equals(i.getIngredient().getName())).toList();
        return Optional.of(new FridgeIngredientDTO(ingrsByName));
    }

    @Transactional
    // TODO: think about how to prevent updating ingredient object by JPA when id and new name is passed
    public Fridge postIngredients(List<FridgeIngredient> ingredients) {
        log.info("PostIngredients:" + ingredients.toString());
        Fridge fridge = getFridge();

        ingredients.forEach(i -> {
            if (i.getUnit() != Unit.PCS) { // default mass unit in fridge is gram, instead of whole pieces
                i.setQuantity(new UnitConverter(i.getUnit(), Unit.G).convert(i.getQuantity()));
                i.setUnit(Unit.G);
            }

            log.debug("insert quantity: " + i.getQuantity());

            // Simple approach for now - get ingredient with latest insert date
            Optional<FridgeIngredient> inFridge = fridge.getFridgeIngredients()
                    .stream()
                    .filter(fi -> fi.getIngredient().getName().equals(i.getIngredient().getName()))
                    .max(Comparator.comparing(FridgeIngredient::getInsertDate));

            if (inFridge.isPresent()) {
                if ((inFridge.get().getExpirationDate() == null && i.getExpirationDate() == null)) {
                    log.debug("Present in fridge!");
                    inFridge.get().addQuantity(i.getQuantity());
                } else if ((inFridge.get().getExpirationDate() != null && i.getExpirationDate() != null) && inFridge.get().getExpirationDate().equals(i.getExpirationDate())) {
                    log.debug("Present in fridge!");
                    inFridge.get().addQuantity(i.getQuantity());
                } else {
                    log.debug("Handling new ingredient");
                    i.setInsertDate(LocalDateTime.now());
                    handleSettingIngredient(i);
                    fridge.addIngredient(i);
                }
            } else {
                log.debug("Handling new ingredient");
                i.setInsertDate(LocalDateTime.now());
                handleSettingIngredient(i);
                fridge.addIngredient(i);
            }
        });

        fridgeRepository.save(fridge);
        return fridge;
    }


    @Transactional
    public FridgeIngredient updateIngredient(FridgeIngredient ingredient) {
        Fridge fridge = getFridge();

        FridgeIngredient fridgeIngredient = fridge.getFridgeIngredients()
                .stream()
                .filter(fi -> fi.getId().equals(ingredient.getId()))
                .findFirst()
                .orElseThrow();

        if (ingredient.getUnit() != Unit.PCS) { // default mass unit in fridge is gram, instead of whole pieces
            ingredient.setQuantity(new UnitConverter(ingredient.getUnit(), Unit.G).convert(ingredient.getQuantity()));
            ingredient.setUnit(Unit.G);
        }

        fridgeIngredient.setQuantity(ingredient.getQuantity());
        fridgeIngredient.setExpirationDate(ingredient.getExpirationDate());
        fridgeIngredient.setOpen(ingredient.isOpen());

        if (!fridgeIngredient.isOpen()) {
            fridgeIngredient.setAfterOpeningExpirationDate(null);
        } else {
            fridgeIngredient.setAfterOpeningExpirationDate(ingredient.getAfterOpeningExpirationDate());
        }


        return fridgeIngredient;
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


    @Transactional
    public FridgeIngredient changeOpen(Long id, boolean open, LocalDateTime afterOpeningExpirationDate) {
        FridgeIngredient byId = fridgeIngredientRepository.findById(id).orElseThrow();

        if (!byId.getFridge().getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }
        if (open == byId.isOpen()) {
            throw new IllegalArgumentException("Open field is already set with this value");
        }

        byId.setOpen(open);
        if (open) {
            byId.setAfterOpeningExpirationDate(afterOpeningExpirationDate);
        } else {
            byId.setAfterOpeningExpirationDate(null);
        }

        return byId;
    }
}
