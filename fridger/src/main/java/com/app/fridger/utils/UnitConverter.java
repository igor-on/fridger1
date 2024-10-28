package com.app.fridger.utils;


import com.app.fridger.model.core.Unit;

public class UnitConverter {

    final private double GRAM_TO_KILOGRAM = 0.001;
    final private double KILOGRAM_TO_GRAM = 1000;
    final private double MILLILITER_TO_LITER = 0.001;
    final private double LITER_TO_MILLILITER = 1000;
    final private double TEASPOON_TO_GRAM = 5;
    final private double GRAM_TO_TEASPOON = 0.2;
    final private double TABLESPOON_TO_GRAM = 15;

    final private double OUNCE_TO_GRAM = 28.34;
    private double factor;

    public UnitConverter(Unit from, Unit to) {
        if (from.equals(Unit.G) && to.equals(Unit.KG)) {
            factor = GRAM_TO_KILOGRAM;
        } else if (from.equals(Unit.KG) && to.equals(Unit.G)) {
            factor = KILOGRAM_TO_GRAM;
        } else if (from.equals(Unit.ML) && to.equals(Unit.L)) {
            factor = MILLILITER_TO_LITER;
        } else if (from.equals(Unit.L) && to.equals(Unit.ML)) {
            factor = LITER_TO_MILLILITER;
        } else if (from.equals(Unit.TSP) && to.equals(Unit.G)) {
            factor = TEASPOON_TO_GRAM;
        } else if (from.equals(Unit.TBSP) && to.equals(Unit.G)) {
            factor = TABLESPOON_TO_GRAM;
        } else {
            factor = 1;
        }
    }

    public UnitConverter(String from, Unit to) {
        if ((from.equals("oz") || from.equals("ounce") || from.equals("ounces")) && to.equals(Unit.G)) {
            factor = OUNCE_TO_GRAM;
        } else {
            throw new IllegalArgumentException("Convert can't parse provided values");
        }
    }

    public double convert(double value) {
        return value * factor;
    }
}
