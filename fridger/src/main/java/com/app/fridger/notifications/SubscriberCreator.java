package com.app.fridger.notifications;

import com.app.fridger.config.EmailNotificationsProperties;
import com.app.fridger.entity.User;
import com.app.fridger.repo.FridgeRepository;
import com.app.fridger.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SubscriberCreator {

    private final EmailService emailService;
    private final EmailNotificationsProperties emailNotificationsProperties;
    private final FridgeRepository fridgeRepository;


    public FoodExpiresSubscriber createFoodExpiresSubscriber(User user) {
        return new FoodExpiresSubscriber(user, emailService, emailNotificationsProperties, fridgeRepository);
    }
}