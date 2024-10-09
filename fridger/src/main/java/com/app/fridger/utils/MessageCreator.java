package com.app.fridger.utils;

import com.app.fridger.entity.FridgeIngredient;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MessageCreator {


    public static String foodExpiresMessage(List<FridgeIngredient> withExpDate, List<FridgeIngredient> noExpDate, List<FridgeIngredient> expired) {
        StringBuilder message = new StringBuilder();

        if (!withExpDate.isEmpty()) {
            message.append("There are some ingredients in your fridge that will expire soon. Check them out!\n");
            withExpDate.forEach(i -> {
                LocalDateTime expDate = i.isOpen() ? i.getAfterOpeningExpirationDate() : i.getExpirationDate();
                message.append(String.format("%s -> %s\n", i.getIngredient().getName(), PredefinedDateTimeFormatter.toddMMyyyy(expDate)));
            });
            message.append("\n\n");
        }

        if (!noExpDate.isEmpty()) {
            String prefix = withExpDate.isEmpty() ? "We" : "Also, we";

            message.append(String.format("%s found ingredients which doesn't have expiration date specified. We suggest to check how they feel - just in case :)\n", prefix));
            noExpDate.forEach(i -> {
                message.append(i.getIngredient().getName()).append("\n");
            });
            message.append("\n\n");
        }

        if (!expired.isEmpty()) {
            message.append("And these only waits for you to throw them out :\\\n");
            expired.forEach(i -> {
                LocalDateTime expDate = i.isOpen() ? i.getAfterOpeningExpirationDate() : i.getExpirationDate();
                message.append(String.format("%s -> %s\n", i.getIngredient().getName(), PredefinedDateTimeFormatter.toddMMyyyy(expDate)));
            });
        }

        return message.toString();
    }
}
