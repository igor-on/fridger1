package com.app.fridger.model;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class UnitConverter implements AttributeConverter<Unit, String> {

    @Override
    public String convertToDatabaseColumn(Unit unit) {
        return unit.name().toLowerCase();
    }

    @Override
    public Unit convertToEntityAttribute(String s) {
        return Stream.of(Unit.values()).filter(u -> u.getTexts().contains(s)).findFirst().orElseThrow();
    }
}
