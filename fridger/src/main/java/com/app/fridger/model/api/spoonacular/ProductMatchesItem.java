package com.app.fridger.model.api.spoonacular;

public class ProductMatchesItem{
	private Object score;
	private String price;
	private String imageUrl;
	private Object averageRating;
	private String link;
	private String description;
	private int id;
	private String title;
	private Object ratingCount;

	public Object getScore(){
		return score;
	}

	public String getPrice(){
		return price;
	}

	public String getImageUrl(){
		return imageUrl;
	}

	public Object getAverageRating(){
		return averageRating;
	}

	public String getLink(){
		return link;
	}

	public String getDescription(){
		return description;
	}

	public int getId(){
		return id;
	}

	public String getTitle(){
		return title;
	}

	public Object getRatingCount(){
		return ratingCount;
	}
}
