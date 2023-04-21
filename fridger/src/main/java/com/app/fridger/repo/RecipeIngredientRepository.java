package com.app.fridger.repo;

import com.app.fridger.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository  extends JpaRepository<RecipeIngredient, Long> {
}
