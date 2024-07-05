package com.app.fridger.repo;

import com.app.fridger.entity.PlannedRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlannedRecipeRepository extends JpaRepository<PlannedRecipe, Long> {

    @Query("SELECT pr FROM PlannedRecipe pr LEFT JOIN FETCH pr.recipe r WHERE r.user.username = :username")
    List<PlannedRecipe> findAll(@Param("username") String username);
}
