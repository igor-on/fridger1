package com.app.fridger.model.api.spoonacular.generated;

import java.util.List;
import lombok.Data;

@Data
public class RecipeInformation {
	private List<Object> usedIngredients;
	private boolean sustainable;
	private List<AnalyzedInstructionsItem> analyzedInstructions;
	private boolean glutenFree;
	private boolean veryPopular;
	private int healthScore;
	private String title;
	private List<String> diets;
	private int aggregateLikes;
	private String creditsText;
	private int readyInMinutes;
	private String sourceUrl;
	private boolean dairyFree;
	private int servings;
	private List<MissedIngredientsItem> missedIngredients;
	private String instructions;
	private boolean vegetarian;
	private List<Object> unusedIngredients;
	private int id;
	private Object preparationMinutes;
	private String imageType;
	private int likes;
	private String summary;
	private Object cookingMinutes;
	private String image;
	private boolean veryHealthy;
	private boolean vegan;
	private boolean cheap;
	private List<ExtendedIngredientsItem> extendedIngredients;
	private List<String> dishTypes;
	private String gaps;
	private List<Object> cuisines;
	private int usedIngredientCount;
	private boolean lowFodmap;
	private String license;
	private int weightWatcherSmartPoints;
	private int missedIngredientCount;
	private List<Object> occasions;
	private Object pricePerServing;
	private Object spoonacularScore;
	private String sourceName;
	private String spoonacularSourceUrl;
}