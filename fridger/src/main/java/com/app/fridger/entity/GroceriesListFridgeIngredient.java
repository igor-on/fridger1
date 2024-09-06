package com.app.fridger.entity;

import com.app.fridger.model.Unit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Table(name = "groceries_list_fridge_ingredient")
@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class GroceriesListFridgeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "quantity")
    @Min(1)
    private double quantity;

    @Column(name = "unit")
    private Unit unit;

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @ManyToOne
    @JoinColumn(name = "groceries_list_id")
    @JsonIgnore
    private GroceriesList groceriesList;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "ingredient_name")
    private Ingredient ingredient;


    public GroceriesListFridgeIngredient(FridgeIngredient ingredient) {
        this.ingredient = ingredient.getIngredient();
        this.expirationDate = ingredient.getExpirationDate();
        this.unit = ingredient.getUnit();
        this.quantity = ingredient.getQuantity();
    }

}
