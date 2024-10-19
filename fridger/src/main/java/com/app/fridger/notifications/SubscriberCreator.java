package com.app.fridger.notifications;

import com.app.fridger.config.EmailNotificationsProperties;
import com.app.fridger.entity.User;
import com.app.fridger.repo.FridgeRepository;
import com.app.fridger.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Log4j2
public class SubscriberCreator {

    private final EmailService emailService;
    private final EmailNotificationsProperties emailNotificationsProperties;
    private final FridgeRepository fridgeRepository;

    public FoodExpiresSubscriber createFoodExpiresSubscriber(User user) {
        return new FoodExpiresSubscriber(user, emailService, emailNotificationsProperties, fridgeRepository);
    }

    public <T extends Subscriber> T create(Class<T> clazz, User user) {
        switch (clazz.getSimpleName()) {
            default:
            case "FoodExpiresSubscriber":
                return (T) new FoodExpiresSubscriber(user, emailService, emailNotificationsProperties, fridgeRepository);
        }
    }
}