package com.app.fridger.model.api.spoonacular;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class GetRandomRecipesResponse {

    private List<RecipeInformation> recipes;
}
