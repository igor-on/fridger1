package com.app.fridger.service;

import com.app.fridger.client.SpoonacularClient;
import com.app.fridger.model.api.spoonacular.RecipeInformation;
import com.app.fridger.model.core.Unit;
import com.app.fridger.model.dto.RecipeDTO;
import com.app.fridger.model.entity.Ingredient;
import com.app.fridger.model.entity.Recipe;
import com.app.fridger.model.entity.RecipeIngredient;
import com.app.fridger.model.core.IngredientType;
import com.app.fridger.repo.IngredientRepository;
import com.app.fridger.repo.RecipeIngredientRepository;
import com.app.fridger.repo.RecipeRepository;
import com.app.fridger.utils.UnitConverter;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Log4j2
@RequiredArgsConstructor
public class RecipeService {

    private final SpoonacularClient spoonacularClient;
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository; // TODO: get rid of this injection - use only service
    private final IngredientService ingredientService;

    private final FileService fileService;

    private final SessionService session;

    public List<Recipe> getRecipes() {
        return recipeRepository.findAll(session.getUser().getUsername());
    }

    @Transactional
    public Recipe createRecipe(Recipe recipe) {

        if (recipe.getId() != 0) {
            throw new IllegalArgumentException("id must be null for new recipes!");
        }
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            recipeIngredient.setRecipe(recipe); //TODO: test checking if recipeIngredient exists

            handleSettingIngredient(recipeIngredient, recipeIngredient.getIngredient());
        }

        Recipe savedRecipe = recipeRepository.save(recipe);
        session.getUser().addRecipe(savedRecipe);

//        return "Successfully saved recipe with id: " + savedRecipe.getId();
        return savedRecipe;
    }

    public String deleteRecipe(Long id) {
        Recipe dbRecipe = recipeRepository.findById(id).orElseThrow();

        if (!dbRecipe.getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

        recipeRepository.delete(dbRecipe); // TODO: think about error path
        return "Successfully deleted recipe with id: " + id;
    }

    @Transactional
    public Recipe updateRecipe(Recipe recipe) {
        Recipe dbRecipe = recipeRepository.findById(recipe.getId()).orElseThrow();

        if (!dbRecipe.getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

        dbRecipe.setName(recipe.getName());
        dbRecipe.setDescription(recipe.getDescription());
        dbRecipe.setInstructions(recipe.getInstructions());
        dbRecipe.setImageUrl(recipe.getImageUrl());
        dbRecipe.setLink(recipe.getLink());
        dbRecipe.setFavorite(recipe.getFavorite());

        dbRecipe.getRecipeIngredients().clear();

        // Populate recipeIngredients from start
        for (RecipeIngredient recipeIngredient : recipe.getRecipeIngredients()) {
            handleSettingIngredient(recipeIngredient, recipeIngredient.getIngredient());
            dbRecipe.add(recipeIngredient);
        }

        return recipeRepository.save(dbRecipe);
    }

    private void handleSettingIngredient(RecipeIngredient recipeIngredient, Ingredient ingredient) {  // TODO there is a problem with this function - it doesn't work when putting mutlitple recipes at once
        log.info("Checking ingredient if exits: " + ingredient.getName());

        Optional<Ingredient> ingrByName = ingredientRepository.findByName(ingredient.getName());

        // if present update with data from db
        if (ingrByName.isPresent()) {
            log.info("Exists! updateing from db...");
            Ingredient dbIngredient = ingrByName.get();
            recipeIngredient.setIngredient(dbIngredient);
        } else { // else save new ingredient data
            log.info("Doesn't exists! Adding new ingredient...");
            if (ingredient.getType() == null) {
                ingredient.setType(IngredientType.OTHER);
            }
            recipeIngredient.setIngredient(ingredient);
        }
    }


    public Recipe getRecipeDetails(Long id) {
        Recipe dbRecipe = recipeRepository.findById(id).orElseThrow();

        if (!dbRecipe.getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

        return dbRecipe;
    }

    public List<Recipe> getFavorites() {
        return recipeRepository.findByFavoriteTrueAndUserUsername(session.getUser().getUsername());
    }

    @Transactional
    public Recipe changeFavorites(Recipe recipe) {
        Recipe dbRecipe = recipeRepository.findById(recipe.getId()).orElseThrow();

        if (!dbRecipe.getUser().getUsername().equals(session.getUser().getUsername())) {
            throw new AccessDeniedException("Access Denied");
        }

        dbRecipe.setFavorite(!dbRecipe.getFavorite());
        return dbRecipe;
    }

    @Transactional
    public List<RecipeDTO> generateRandomRecipes(int number) {
        List<RecipeInformation> randomRecipes = spoonacularClient.getRandomRecipes(number);

        List<Recipe> recipes = randomRecipes.stream().map(this::toEntity).toList();
        recipes.forEach(r -> r.setUser(session.getUser()));

        recipeRepository.saveAll(recipes);

        return RecipeDTO.fromEntities(recipes);
    }

    public Recipe toEntity(RecipeInformation recipeInformation) {
        Recipe recipe = new Recipe();
        recipe.setName(recipeInformation.getTitle());
        recipe.setDescription(recipeInformation.getSummary());
        recipe.setInstructions(recipeInformation.getInstructions());
        recipe.setImageUrl(recipeInformation.getImage());
        recipe.setLink(recipeInformation.getSourceUrl());
        recipe.setFavorite(false);


        Map<String, Ingredient> checkedIngredients = new HashMap<>();
        recipeInformation.getExtendedIngredients().forEach(ei -> {
            RecipeIngredient recipeIngredient = new RecipeIngredient();
            if (!checkedIngredients.containsKey(ei.getName())) {
                checkedIngredients.put(ei.getName(), ingredientService.getOrCreateIngredient(ei.getName(), null));
            }
            recipeIngredient.setIngredient(checkedIngredients.get(ei.getName()));

            Unit unit;
            double quantity;
            try {
                log.info("First try - using available units");
                unit = Unit.fromText(ei.getMeasures().getMetric().getUnitShort());
                quantity = ei.getMeasures().getMetric().getAmount();
            } catch (Exception e) {
                try {
                    log.info("Second try - using unit converter");
                    UnitConverter unitConverter = new UnitConverter(ei.getMeasures().getMetric().getUnitShort(), Unit.G);
                    quantity = unitConverter.convert(ei.getMeasures().getMetric().getAmount());
                    unit = Unit.G;
                } catch (Exception ex) {
                    log.error("Provided unit is currently not parsable... fallback to pieces: " + ei.getMeasures().getMetric().getUnitLong());
                    fileService.writeFileToResourceFolder("spoonacular-missing-units.txt", ei.getMeasures().getMetric().getUnitLong());
                    quantity = ei.getMeasures().getMetric().getAmount();
                    unit = Unit.PCS;
                }
            }

            recipeIngredient.setQuantity(quantity);
            recipeIngredient.setUnit(unit);

            recipe.add(recipeIngredient);
        });

        return recipe;
    }
}
