package com.app.fridger.model;

import com.app.fridger.config.EmailNotificationsProperties;
import com.app.fridger.entity.FridgeIngredient;
import com.app.fridger.entity.User;
import com.app.fridger.repo.FridgeRepository;
import com.app.fridger.service.EmailService;
import com.app.fridger.utils.MessageCreator;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@ToString
@EqualsAndHashCode(of = {"username"})
public class FoodExpiresSubscriber implements Subscriber {

    private final EmailNotificationsProperties emailNotificationsProperties;
    private final EmailService emailService;

    private final String username;
    private final FridgeRepository fridgeRepository;

    public FoodExpiresSubscriber(User user, EmailService emailService, EmailNotificationsProperties emailNotificationsProperties, FridgeRepository fridgeRepository) {
        this.emailNotificationsProperties = emailNotificationsProperties;
        this.emailService = emailService;
        this.username = user.getUsername();
        this.fridgeRepository = fridgeRepository;
    }

    public String prepareFoodExpiresMessage() {
        List<FridgeIngredient> withExpDate = new ArrayList<>();
        List<FridgeIngredient> noExpDate = new ArrayList<>();
        List<FridgeIngredient> expired = new ArrayList<>();


        fridgeRepository.findByUsername(username).orElseThrow()
                .getFridgeIngredients().forEach(ingredient -> {
                    LocalDateTime expDate = ingredient.isOpen() ? ingredient.getAfterOpeningExpirationDate() : ingredient.getExpirationDate();
                    if (expDate == null) {
                        noExpDate.add(ingredient);
                    } else if (LocalDate.now().minusDays(emailNotificationsProperties.getIngredients().getExpireMsgBeforeDays()).isBefore(expDate.toLocalDate())) {
                        withExpDate.add(ingredient);
                    } else if (LocalDate.now().minusDays(emailNotificationsProperties.getIngredients().getExpireMsgBeforeDays()).isAfter(expDate.toLocalDate())) {
                        expired.add(ingredient);
                    }
                });


        return MessageCreator.foodExpiresMessage(withExpDate, noExpDate, expired);
    }


    @Override
    public void update() {
        if (false) {
            emailService.sendSimpleMessage(username, "Daily ingredients remainder", prepareFoodExpiresMessage());
        }
        emailService.sendSimpleMessage("igor.nowakowskij@gmail.com", "Daily ingredients remainder", prepareFoodExpiresMessage());
    }
}
