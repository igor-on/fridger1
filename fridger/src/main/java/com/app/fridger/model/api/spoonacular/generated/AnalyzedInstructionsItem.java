package com.app.fridger.model.api.spoonacular.generated;

import java.util.List;
import lombok.Data;

@Data
public class AnalyzedInstructionsItem{
	private String name;
	private List<StepsItem> steps;
}