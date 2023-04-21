package com.app.fridger.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name = "recipes")
@Entity
@NoArgsConstructor
@Getter
@Setter
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "name")
    @NotBlank(message = "Name is mandatory")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "instructions")
    @NotBlank(message = "Instructions is mandatory")
    private String instructions;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "link")
    private String link;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "recipe")
    private List<RecipeIngredient> recipeIngredients;

    public void add(RecipeIngredient ingredient) {
        if (ingredient != null) {
            if (recipeIngredients == null) {
                recipeIngredients = new ArrayList<>();
            }

            recipeIngredients.add(ingredient);
            ingredient.setRecipe(this);
        }
    }
}
