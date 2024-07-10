package com.app.fridger.entity;

import com.app.fridger.model.IngredientType;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonIgnore
    private long id;
    @Column(name = "name")
    @NotBlank(message = "Name is mandatory")
    private String name;
    // TODO: Write attribute converter for this
    @Column(name = "type")
    @NotNull
    @Enumerated(EnumType.STRING)
    private IngredientType type;
}
