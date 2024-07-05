package com.app.fridger.service;

import com.app.fridger.entity.PlannedRecipe;
import com.app.fridger.repo.PlannedRecipeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class RecipeCalendarService {

    private final PlannedRecipeRepository plannedRecipeRepository;
    private final SessionService session;

    public List<PlannedRecipe> getPlannedRecipes() {
        return plannedRecipeRepository.findAll(session.getUser().getUsername());
    }

    @Transactional
    public PlannedRecipe createPlannedRecipe(PlannedRecipe plannedRecipe) {
        return plannedRecipeRepository.save(plannedRecipe);
    }

    public String deletePlannedRecipe(long id) {
        PlannedRecipe dbPlannedRecipe = plannedRecipeRepository.findById(id).orElseThrow();

        if (!dbPlannedRecipe.getRecipe().getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

        plannedRecipeRepository.deleteById(id);
        return "Successfully deleted planned recipe with id: " + id;
    }

    @Transactional
    public PlannedRecipe updatePlannedRecipe(PlannedRecipe plannedRecipe) {
        PlannedRecipe dbPlannedRecipe = plannedRecipeRepository.findById(plannedRecipe.getId()).orElseThrow();
        if (!dbPlannedRecipe.getRecipe().getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

//        dbPlannedRecipe.setTitle(plannedRecipe.getTitle());
        dbPlannedRecipe.setDone(plannedRecipe.isDone());
        dbPlannedRecipe.setPlannedDate(plannedRecipe.getPlannedDate());
        if (plannedRecipe.getRecipe() != null) {
            dbPlannedRecipe.setRecipe(plannedRecipe.getRecipe());
        }

        return plannedRecipeRepository.save(dbPlannedRecipe);
    }
}
