package com.app.fridger.service;

import com.app.fridger.dto.GroceriesListDTO;
import com.app.fridger.entity.FridgeIngredient;
import com.app.fridger.entity.GroceriesList;
import com.app.fridger.entity.GroceriesListIngredient;
import com.app.fridger.entity.Ingredient;
import com.app.fridger.model.Unit;
import com.app.fridger.repo.FridgeIngredientRepository;
import com.app.fridger.repo.GroceriesListRepository;
import com.app.fridger.repo.IngredientRepository;
import com.app.fridger.utils.UnitConverter;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class GroceriesService {

    private final IngredientRepository ingredientRepository;
    private final GroceriesListRepository groceriesListRepository;

    private final FridgeService fridgeService;

    private final SessionService session;

    public GroceriesListDTO generateGroceriesList(LocalDateTime startDate, LocalDateTime endDate, boolean withFridge) {
        List<Object[]> ingredients = ingredientRepository.getIngredientsFromPlannedRecipes(startDate, endDate, session.getUser().getUsername());

        GroceriesList groceriesList = new GroceriesList();
        groceriesList.setStartDate(startDate);
        groceriesList.setEndDate(endDate);
        groceriesList.setGroceriesListIngredient(new ArrayList<>());
        for (Object[] v : ingredients) {
            String ingrName = String.valueOf(v[0]);
            double quantity = Double.parseDouble(String.valueOf(v[1]));
            Unit unit = Unit.fromText(String.valueOf(v[2]));
            Ingredient ingredient = ingredientRepository.findByName(ingrName).orElseThrow();

            if (withFridge) {
                Optional<FridgeIngredient> inFridge = fridgeService.getIngredientByName(ingredient.getName());

                if (inFridge.isPresent()) {
                    FridgeIngredient fridgeIngredient = inFridge.get();
                    if (unit != Unit.PCS & fridgeIngredient.getUnit() != Unit.PCS) { // subtract quantities in gram unit
                        UnitConverter unitConverter = new UnitConverter(unit, fridgeIngredient.getUnit());
                        log.debug("Groceries ingr quantity: " + ingredient.getName() + " - " + quantity + "  " + unit  + " after conversion: " + unitConverter.convert(quantity));
                        quantity = unitConverter.convert(quantity) - fridgeIngredient.getQuantity();
                        log.debug("Fridge ingr quantity: " + fridgeIngredient.getIngredient().getName() +
                                " - " +
                                fridgeIngredient.getQuantity() +
                                "  " + fridgeIngredient.getUnit() );
                        unit = fridgeIngredient.getUnit();
                    } else if ((unit == Unit.PCS & fridgeIngredient.getUnit() == Unit.PCS)) { // subtract whole pieces
                        quantity -= fridgeIngredient.getQuantity();
                    } // don't do nothing TODO
                }

            }


            GroceriesListIngredient groceriesListIngredient = new GroceriesListIngredient();

            if (quantity > 0) {
                groceriesListIngredient.setIngredient(ingredient);
                groceriesListIngredient.setQuantity(quantity);
                groceriesListIngredient.setUnit(unit);
                groceriesList.add(groceriesListIngredient);
            }
        }

        groceriesList.setUser(session.getUser());

        groceriesListRepository.save(groceriesList);
        return new GroceriesListDTO(groceriesList);
    }

    public List<GroceriesListDTO> getGroceriesLists() {
        return groceriesListRepository.findByUserUsername(session.getUser().getUsername()).stream()
                .map(GroceriesListDTO::new)
                .toList();
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
