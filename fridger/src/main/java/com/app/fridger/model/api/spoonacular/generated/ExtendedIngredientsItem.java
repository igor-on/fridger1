package com.app.fridger.model.api.spoonacular.generated;

import java.util.List;
import lombok.Data;

@Data
public class ExtendedIngredientsItem{
	private String originalName;
	private String image;
	private double amount;
	private String unit;
	private Measures measures;
	private String nameClean;
	private String original;
	private List<Object> meta;
	private String name;
	private int id;
	private String aisle;
	private String consistency;
}