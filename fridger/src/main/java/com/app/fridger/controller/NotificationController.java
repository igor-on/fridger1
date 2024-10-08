package com.app.fridger.controller;

import com.app.fridger.model.Notification;
import com.app.fridger.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("${fridger.request-map}")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/send")
    public List<Notification> sendMessage() {
        return notificationService.prepareFoodExpiresNotifications();
    }
}
