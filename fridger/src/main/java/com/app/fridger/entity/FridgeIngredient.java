package com.app.fridger.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "fridge_ingredient")
@Entity
@NoArgsConstructor
@Getter
@Setter
public class FridgeIngredient {

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

    @Column(name = "expiration_date")
    private LocalDateTime expirationDate;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "ingredient_name")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(name = "fridge_id")
    @JsonIgnore
    private Fridge fridge;
}
