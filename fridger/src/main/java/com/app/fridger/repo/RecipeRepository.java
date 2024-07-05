package com.app.fridger.repo;

import com.app.fridger.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query(value = """
            SELECT r FROM Recipe r
            LEFT JOIN FETCH r.recipeIngredients ri
            LEFT JOIN FETCH r.recipeIngredients.ingredient rii
            WHERE r.user.username = :username""")
    List<Recipe> findAll(@Param(value = "username") String username);

    List<Recipe> findByFavoriteTrueAndUserUsername(@Param(value = "username") String username);

    List<Recipe> findByRecipeIngredientsIngredientName(@Param(value = "name") String name);
}
