package com.app.fridger.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Table(name = "planned_recipe")
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class PlannedRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    @NotNull
    private String title;
    @Column(name = "planned_date")
    @NotNull
    private LocalDateTime plannedDate;
    @Column(name = "done")
    private boolean done;

    @ManyToOne
    private Recipe recipe;
}
