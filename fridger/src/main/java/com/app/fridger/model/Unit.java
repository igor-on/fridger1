package com.app.fridger.model;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

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

    public static Unit fromText(String text) {
        return Stream.of(Unit.values()).filter(u -> u.getTexts().contains(text)).findFirst().orElseThrow();
    }
}
