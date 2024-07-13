package com.app.fridger.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Table(name = "recipe_ingredient")
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "quantity")
    @Min(1)
    private int quantity;
    @Column(name = "unit")
    @NotBlank(message = "Unit is mandatory")
    private String unit;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    @JsonIgnore
    private Recipe recipe;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    public void setRecipe(Recipe recipe) {
        if (recipe != null) {
            this.recipe = recipe;
        }
    }

    public void setIngredient(Ingredient ingredient) {
        if (ingredient != null) {
            this.ingredient = ingredient;
        }
    }
}
