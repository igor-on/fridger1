package com.app.fridger.model.api.spoonacular.generated;

import java.util.List;
import lombok.Data;

@Data
public class StepsItem{
	private int number;
	private List<IngredientsItem> ingredients;
	private List<Object> equipment;
	private String step;
	private Length length;
}