package com.app.fridger.repo;

import com.app.fridger.entity.FridgeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FridgeIngredientRepository extends JpaRepository<FridgeIngredient, Long> {
}
