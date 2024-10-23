package com.app.fridger.repo;

import com.app.fridger.entity.Fridge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FridgeRepository extends JpaRepository<Fridge, String> {

    Optional<Fridge> findByUsername(@Param("username")String username);
}
