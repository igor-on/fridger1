package com.app.fridger.service;

import com.app.fridger.config.MailNotificationsProperties;
import com.app.fridger.entity.FridgeIngredient;
import com.app.fridger.model.Notification;
import com.app.fridger.repo.FridgeRepository;
import com.app.fridger.utils.MessageCreator;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class NotificationService {

    private final FridgeRepository fridgeRepository;
    private final EmailService emailService;

    private final MailNotificationsProperties notificationsProperties;

    public List<Notification> prepareFoodExpiresNotifications() {

        List<Notification> notifications = new ArrayList<>();

        fridgeRepository.findAll().forEach(fridge -> {
            List<FridgeIngredient> withExpDate = new ArrayList<>();
            List<FridgeIngredient> noExpDate = new ArrayList<>();
            List<FridgeIngredient> expired = new ArrayList<>();


            fridge.getFridgeIngredients().forEach(ingredient -> {
                LocalDateTime expDate = ingredient.isOpen() ? ingredient.getAfterOpeningExpirationDate() : ingredient.getExpirationDate();
                if (expDate == null) {
                    noExpDate.add(ingredient);
                } else if (LocalDate.now().minusDays(notificationsProperties.getIngredients().getExpireMsgBeforeDays()).isBefore(expDate.toLocalDate())) {
                    withExpDate.add(ingredient);
                } else if (LocalDate.now().minusDays(notificationsProperties.getIngredients().getExpireMsgBeforeDays()).isAfter(expDate.toLocalDate())) {
                    expired.add(ingredient);
                }
            });


            String msg = MessageCreator.foodExpiresMessage(withExpDate, noExpDate, expired);

            if (!msg.isEmpty()) {
                notifications.add(new Notification(fridge.getUsername(), msg));
            }
        });


        return notifications;
    }

    @Transactional
    @Scheduled(cron = "${mail.notifications.cron}", zone = "Europe/Warsaw") // Every day at 12:00 PM
    public void sendNotifications() {
        log.debug("Sending notifications!");

        List<Notification> notifications = prepareFoodExpiresNotifications();

        notifications.forEach(n -> {
            emailService.sendSimpleMessage("igor.nowakowskij@gmail.com", "Dail ingredients remainder", n.getMessage());
        });

    }
}
