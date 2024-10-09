package com.app.fridger.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class PredefinedDateTimeFormatter {

    private static final DateTimeFormatter ddMMyyyy = DateTimeFormatter.ofPattern("dd.MM.yyyy");


    public static String toddMMyyyy(LocalDateTime dateTime) {
        return ddMMyyyy.format(dateTime);
    }
}
