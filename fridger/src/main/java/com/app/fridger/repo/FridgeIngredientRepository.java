package com.app.fridger.repo;

import com.app.fridger.entity.FridgeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FridgeIngredientRepository extends JpaRepository<FridgeIngredient, Long> {

    Optional<FridgeIngredient> findByIngredientName(@Param("name") String name);
}
