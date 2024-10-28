package com.app.fridger.model.core;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class Notification {

    private String recipient;
    private String message;
}
