package com.app.fridger.model.core;

import java.util.List;
import java.util.stream.Stream;

public enum Unit {
    G(List.of("g", "gram", "grams")),
    KG(List.of("kg", "kilogram", "kilograms")),
    ML(List.of("ml", "milliliter", "milliliters")),
    L(List.of("l", "liter", "liters")),
    PCS(List.of("pcs", "pieces", "piece")),

    TSP(List.of("tsp", "tsps", "teaspoon", "teaspoons")),

    TBSP(List.of("tbsp", "tbsps", "tablespoon", "tablespoons"));

    private final List<String> texts;

    Unit(List<String> texts) {
        this.texts = texts;
    }

    public List<String> getTexts() {
        return texts;
    }

    public static Unit fromText(String text) {
        return Stream.of(Unit.values()).filter(u -> u.getTexts().contains(text.toLowerCase())).findFirst().orElseThrow();
    }

}
