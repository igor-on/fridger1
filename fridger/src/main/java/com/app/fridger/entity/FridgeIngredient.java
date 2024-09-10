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

@Table(name = "fridge_ingredient")
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FridgeIngredient {

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

    @Column(name = "insert_date")
    private LocalDateTime insertDate;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "ingredient_name")
    private Ingredient ingredient;

    @ManyToOne
    @JoinColumn(name = "fridge_id")
    @JsonIgnore
    private Fridge fridge;

    public void addQuantity(double quantity) {
        this.setQuantity(this.quantity + quantity);
    }
}
