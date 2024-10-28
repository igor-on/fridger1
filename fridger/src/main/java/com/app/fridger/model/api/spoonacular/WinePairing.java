package com.app.fridger.model.api.spoonacular;

import java.util.List;

public class WinePairing{
	private List<ProductMatchesItem> productMatches;
	private String pairingText;
	private List<String> pairedWines;

	public List<ProductMatchesItem> getProductMatches(){
		return productMatches;
	}

	public String getPairingText(){
		return pairingText;
	}

	public List<String> getPairedWines(){
		return pairedWines;
	}
}