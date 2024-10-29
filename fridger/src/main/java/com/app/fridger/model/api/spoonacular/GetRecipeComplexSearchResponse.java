package com.app.fridger.model.api.spoonacular;

import java.util.List;

import com.app.fridger.model.api.spoonacular.generated.RecipeInformation;
import lombok.Data;

@Data
public class GetRecipeComplexSearchResponse{
	private int number;
	private int totalResults;
	private int offset;
	private List<RecipeInformation> results;
}