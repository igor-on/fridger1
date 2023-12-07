package com.app.fridger.repo;

import com.app.fridger.entity.GroceriesList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroceriesListRepository extends JpaRepository<GroceriesList, Long> {
}
