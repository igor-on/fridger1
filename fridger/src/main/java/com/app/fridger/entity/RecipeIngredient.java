package com.app.fridger.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Table(name = "recipe_ingredient")
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
//    @JsonIgnore
    private long id;
//    @Column(name = "ingredient_id")
//    private long ingredientId;
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
