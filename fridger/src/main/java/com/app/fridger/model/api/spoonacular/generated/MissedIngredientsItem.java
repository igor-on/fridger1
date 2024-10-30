package com.app.fridger.model.api.spoonacular.generated;

import java.util.List;
import lombok.Data;

@Data
public class MissedIngredientsItem{
	private String originalName;
	private String image;
	private Object amount;
	private String unit;
	private String unitShort;
	private String original;
	private String extendedName;
	private List<Object> meta;
	private String name;
	private String unitLong;
	private int id;
	private String aisle;
}