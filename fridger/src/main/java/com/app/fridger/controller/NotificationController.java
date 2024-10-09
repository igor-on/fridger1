package com.app.fridger.controller;

import com.app.fridger.config.EmailNotificationsProperties;
import com.app.fridger.model.FoodExpiresSubscriber;
import com.app.fridger.repo.FridgeRepository;
import com.app.fridger.service.EmailService;
import com.app.fridger.service.NotificationService;
import com.app.fridger.service.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("${fridger.request-map}/notifications")
public class NotificationController {

    private final SessionService session;
    private final EmailService emailService;
    private final EmailNotificationsProperties emailNotificationsProperties;
    private final NotificationService notificationService;
    private final FridgeRepository fridgeRepository;

    @GetMapping("/foodExpires/subscribe")
    public Map<String, String> subscribe() {
        HashMap<String, String> results = new HashMap<>();
        try {
            notificationService.subscribe(new FoodExpiresSubscriber(session.getUser(), emailService, emailNotificationsProperties, fridgeRepository));
            results.put("message", "Successfully subscribed to food expires notification.");
        } catch (Exception e) {
            results.put("message", "Something went wrong during subscribing : " + e.getMessage());
        }

        return results;
    }

    @GetMapping("/foodExpires/unsubscribe")
    public Map<String, String> unsubscribe() {
        HashMap<String, String> results = new HashMap<>();
        try {
            notificationService.unsubscribe(new FoodExpiresSubscriber(session.getUser(), emailService, emailNotificationsProperties, fridgeRepository));
            results.put("message", "Successfully unsubscribed from food expires notification.");
        } catch (Exception e) {
            results.put("message", "Something went wrong during unsubscribing : " + e.getMessage());
        }

        return results;
    }
}
