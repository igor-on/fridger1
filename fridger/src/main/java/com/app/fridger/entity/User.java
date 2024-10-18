package com.app.fridger.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Table(name = "users")
@Entity
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = {"username"})
public class User {

    @Id
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    @NotNull
    @JsonIgnore
    private String password;
    @Column(name = "roles")
    private String roles;
    @Column(name = "enabled")
    @JsonIgnore
    private Boolean enabled;

    @Column(name = "email")
    @Email
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "profile_picture", columnDefinition = "MEDIUMBLOB")
    // TODO: for now - later move id do S3 service
    @Lob
    private byte[] profilePicture;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIgnore
    private List<Recipe> recipes;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIgnore
    private List<GroceriesList> groceriesLists;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private Fridge fridge;

    @ManyToMany(mappedBy = "subscribers")
    private Set<Notification> notifications;


    public void addRecipe(Recipe recipe) {
        if (recipe != null) {
            if (recipes == null) {
                recipes = new ArrayList<>();
            }

            recipes.add(recipe);
            recipe.setUser(this);
        }
    }

    public void addGroceriesList(GroceriesList groceriesList) {
        if (groceriesList != null) {
            if (groceriesLists == null) {
                groceriesLists = new ArrayList<>();
            }

            groceriesLists.add(groceriesList);
            groceriesList.setUser(this);
        }
    }

    public void setFridge(Fridge fridge) {
        if (fridge != null) {
            this.fridge = fridge;
            fridge.setUser(this);
        }
    }
}
