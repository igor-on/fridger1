package com.app.fridger.service;

import com.app.fridger.dto.ShoppingProduct;
import com.app.fridger.entity.PlannedRecipe;
import com.app.fridger.entity.Recipe;
import com.app.fridger.entity.RecipeIngredient;
import com.app.fridger.repo.PlannedRecipeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Log4j2
@RequiredArgsConstructor
public class RecipeCalendarService {

    private final PlannedRecipeRepository plannedRecipeRepository;

    public List<PlannedRecipe> getPlannedRecipes() {
        return plannedRecipeRepository.findAll();
    }

    @Transactional
    public PlannedRecipe createPlannedRecipe(PlannedRecipe plannedRecipe) {
        return plannedRecipeRepository.save(plannedRecipe);
    }

    public String deletePlannedRecipe(long id) {
        plannedRecipeRepository.deleteById(id);

        return "Successfully deleted planned recipe with id: " + id;
    }

    @Transactional
    public PlannedRecipe updatePlannedRecipe(PlannedRecipe plannedRecipe) {
        Optional<PlannedRecipe> plannedRecipeById = plannedRecipeRepository.findById(plannedRecipe.getId());

        if (plannedRecipeById.isEmpty()) {
            throw new EmptyResultDataAccessException("Cannot find recipe to update - id: " + plannedRecipe.getId(), 1);
        }

        PlannedRecipe dbPlannedRecipe = plannedRecipeById.get();
//        dbPlannedRecipe.setTitle(plannedRecipe.getTitle());
        dbPlannedRecipe.setDone(plannedRecipe.isDone());
        dbPlannedRecipe.setPlannedDate(plannedRecipe.getPlannedDate());
        if (plannedRecipe.getRecipe() != null) {
            dbPlannedRecipe.setRecipe(plannedRecipe.getRecipe());
        }

        return plannedRecipeRepository.save(dbPlannedRecipe);
    }
}
