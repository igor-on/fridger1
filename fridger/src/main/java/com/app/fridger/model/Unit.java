package com.app.fridger.model;

import java.util.ArrayList;
import java.util.List;

public enum Unit {
    G(List.of("g", "gram")),
    KG(List.of("kg", "kilogram")),
    ML(List.of("ml", "milliliter")),
    L(List.of("l", "liter")),
    PCS(List.of("pcs", "pieces"));

    private final List<String> texts;

    Unit(List<String> texts) {
        this.texts = texts;
    }

    public List<String> getTexts() {
        return texts;
    }
}
