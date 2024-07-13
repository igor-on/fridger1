package com.app.fridger.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Table(name = "fridges")
@Entity
@NoArgsConstructor
@Getter
@Setter
public class Fridge {

    @Id
    @Column(name = "username")
    private String username;
    @Column(name = "name")
    @NotNull
    private String name;

    @OneToOne
    @MapsId
    @JoinColumn(name = "username")
    @JsonIgnore
    private User user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "fridge")
    private List<FridgeIngredient> fridgeIngredients;


    public void addIngredient(FridgeIngredient ingredient) {
        if (ingredient != null) {
            if (fridgeIngredients == null) {
                fridgeIngredients = new ArrayList<>();
            }

            fridgeIngredients.add(ingredient);
            ingredient.setFridge(this);
        }
    }
}
