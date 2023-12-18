package com.app.fridger.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Table(name = "groceries_list_ingredient")
@Entity
@NoArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
public class GroceriesListIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "quantity")
    @Min(1)
    private int quantity;
    @Column(name = "unit")
    @NotBlank(message = "Unit is mandatory")
    private String unit;

    @ManyToOne
    @JoinColumn(name = "groceries_list_id")
    @JsonIgnore
    private GroceriesList groceriesList;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;


    public void setGroceriesList(GroceriesList groceriesList) {
        if (groceriesList != null) {
            this.groceriesList = groceriesList;
        }
    }

    public void setIngredient(Ingredient ingredient) {
        if (ingredient != null) {
            this.ingredient = ingredient;
        }
    }
}