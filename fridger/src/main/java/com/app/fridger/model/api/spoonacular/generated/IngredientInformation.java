package com.app.fridger.model.api.spoonacular.generated;

import java.util.List;
import lombok.Data;

@Data
public class IngredientInformation{
	private String image;
	private String name;
	private List<String> possibleUnits;
	private int id;
	private String aisle;
}