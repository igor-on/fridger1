package com.app.fridger.model.core;

import lombok.Getter;

@Getter
public enum NotificationType {

    FOOD_EXPIRES("foodExpires");

    private final String name;

    NotificationType(String name) {
        this.name = name;
    }
}
