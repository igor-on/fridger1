package com.app.fridger.model.api.spoonacular;

import java.util.List;

public class ExtendedIngredientsItem{
	private String originalName;
	private String image;
	private Long amount;
	private Measures measures;
	private String unit;
	private String original;
	private List<Object> meta;
	private String name;
	private int id;
	private String aisle;
	private String consistency;

	public String getOriginalName(){
		return originalName;
	}

	public String getImage(){
		return image;
	}

	public Long getAmount(){
		return amount;
	}

	public Measures getMeasures(){
		return measures;
	}

	public String getUnit(){
		return unit;
	}

	public String getOriginal(){
		return original;
	}

	public List<Object> getMeta(){
		return meta;
	}

	public String getName(){
		return name;
	}

	public int getId(){
		return id;
	}

	public String getAisle(){
		return aisle;
	}

	public String getConsistency(){
		return consistency;
	}
}