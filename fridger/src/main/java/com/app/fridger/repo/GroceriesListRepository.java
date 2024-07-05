package com.app.fridger.repo;

import com.app.fridger.entity.GroceriesList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroceriesListRepository extends JpaRepository<GroceriesList, Long> {


    List<GroceriesList> findByUserUsername(@Param("username") String username);

}
