package com.app.fridger.model.api.spoonacular.generated;

import lombok.Data;

import java.util.List;

@Data
public class WinePairing{
	private List<ProductMatchesItem> productMatches;
	private String pairingText;
	private List<String> pairedWines;
}