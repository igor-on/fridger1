package com.app.fridger.model.api.spoonacular;

import java.util.List;

public class RecipeInformation {
	private String instructions;
	private boolean sustainable;
	private List<Object> analyzedInstructions;
	private boolean glutenFree;
	private boolean veryPopular;
	private String title;
	private Object healthScore;
	private List<Object> diets;
	private int readyInMinutes;
	private String sourceUrl;
	private String creditsText;
	private boolean dairyFree;
	private int servings;
	private boolean vegetarian;
	private boolean whole30;
	private int id;
	private int preparationMinutes;
	private String imageType;
	private WinePairing winePairing;
	private String summary;
	private String image;
	private int cookingMinutes;
	private boolean veryHealthy;
	private boolean vegan;
	private boolean cheap;
	private List<String> dishTypes;
	private List<ExtendedIngredientsItem> extendedIngredients;
	private String gaps;
	private List<Object> cuisines;
	private boolean lowFodmap;
	private String license;
	private int weightWatcherSmartPoints;
	private List<Object> occasions;
	private Object spoonacularScore;
	private Object pricePerServing;
	private String sourceName;
	private String spoonacularSourceUrl;
	private boolean ketogenic;

	public String getInstructions(){
		return instructions;
	}

	public boolean isSustainable(){
		return sustainable;
	}

	public List<Object> getAnalyzedInstructions(){
		return analyzedInstructions;
	}

	public boolean isGlutenFree(){
		return glutenFree;
	}

	public boolean isVeryPopular(){
		return veryPopular;
	}

	public String getTitle(){
		return title;
	}

	public Object getHealthScore(){
		return healthScore;
	}

	public List<Object> getDiets(){
		return diets;
	}

	public int getReadyInMinutes(){
		return readyInMinutes;
	}

	public String getSourceUrl(){
		return sourceUrl;
	}

	public String getCreditsText(){
		return creditsText;
	}

	public boolean isDairyFree(){
		return dairyFree;
	}

	public int getServings(){
		return servings;
	}

	public boolean isVegetarian(){
		return vegetarian;
	}

	public boolean isWhole30(){
		return whole30;
	}

	public int getId(){
		return id;
	}

	public int getPreparationMinutes(){
		return preparationMinutes;
	}

	public String getImageType(){
		return imageType;
	}

	public WinePairing getWinePairing(){
		return winePairing;
	}

	public String getSummary(){
		return summary;
	}

	public String getImage(){
		return image;
	}

	public int getCookingMinutes(){
		return cookingMinutes;
	}

	public boolean isVeryHealthy(){
		return veryHealthy;
	}

	public boolean isVegan(){
		return vegan;
	}

	public boolean isCheap(){
		return cheap;
	}

	public List<String> getDishTypes(){
		return dishTypes;
	}

	public List<ExtendedIngredientsItem> getExtendedIngredients(){
		return extendedIngredients;
	}

	public String getGaps(){
		return gaps;
	}

	public List<Object> getCuisines(){
		return cuisines;
	}

	public boolean isLowFodmap(){
		return lowFodmap;
	}

	public String getLicense(){
		return license;
	}

	public int getWeightWatcherSmartPoints(){
		return weightWatcherSmartPoints;
	}

	public List<Object> getOccasions(){
		return occasions;
	}

	public Object getSpoonacularScore(){
		return spoonacularScore;
	}

	public Object getPricePerServing(){
		return pricePerServing;
	}

	public String getSourceName(){
		return sourceName;
	}

	public String getSpoonacularSourceUrl(){
		return spoonacularSourceUrl;
	}

	public boolean isKetogenic(){
		return ketogenic;
	}
}