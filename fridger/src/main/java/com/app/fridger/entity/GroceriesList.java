package com.app.fridger.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "groceries_lists")
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class GroceriesList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "start_date")
    @NotNull
    private LocalDateTime startDate;
    @Column(name = "end_date")
    @NotNull
    private LocalDateTime endDate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "groceriesList")
    private List<GroceriesListIngredient> groceriesListIngredient;

    @ManyToOne
    @JoinColumn(name = "username")
    private User user;

    public void add(GroceriesListIngredient ingredient) {
        if (ingredient != null) {
            if (groceriesListIngredient == null) {
                groceriesListIngredient = new ArrayList<>();
            }

            ingredient.setGroceriesList(this);
            groceriesListIngredient.add(ingredient);
        }
    }
}
