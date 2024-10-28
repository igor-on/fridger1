package com.app.fridger.model.entity;

import com.app.fridger.model.core.IngredientType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Table(name = "ingredients")
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Ingredient {

    @Id
    @Column(name = "name")
    @NotBlank(message = "Name is mandatory")
    private String name;
    // TODO: Write attribute converter for this
    @Column(name = "type")
    @NotNull
    @Enumerated(EnumType.STRING)
    private IngredientType type;
}
