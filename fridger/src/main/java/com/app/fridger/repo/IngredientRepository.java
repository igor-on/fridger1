package com.app.fridger.repo;

import com.app.fridger.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    Optional<Ingredient> findByName(@Param(value = "name") String name);

    @Query(nativeQuery = true, value = """
            SELECT i.name, sum(ri.quantity), ri.unit
            FROM planned_recipe as pr\s
            LEFT JOIN recipes as r on pr.recipe_id = r.id\s
            LEFT JOIN recipe_ingredient as ri on r.id = ri.recipe_id\s
            LEFT JOIN ingredients as i on ri.ingredient_id = i.id
            WHERE r.username = :username AND pr.planned_date >= :startDate AND pr.planned_date <= :endDate
            GROUP BY i.name, ri.unit;
            """)
    List<Object[]> getIngredientsListFromPlannedRecipes(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, @Param("username") String username);
}
