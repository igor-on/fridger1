package com.app.fridger.controller;

import com.app.fridger.config.EmailNotificationsProperties;
import com.app.fridger.exceptions.AlreadySubscribedException;
import com.app.fridger.exceptions.NotSubscribedException;
import com.app.fridger.model.FoodExpiresSubscriber;
import com.app.fridger.repo.FridgeRepository;
import com.app.fridger.service.EmailService;
import com.app.fridger.service.NotificationService;
import com.app.fridger.service.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.HashMap;

@Controller
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
    public ResponseEntity<Object> subscribe(HttpServletRequest req) {
        try {
            HashMap<String, String> results = new HashMap<>();
            notificationService.subscribe(new FoodExpiresSubscriber(session.getUser(), emailService, emailNotificationsProperties, fridgeRepository));
            results.put("message", "Successfully subscribed to food expires notification.");

            return ResponseEntity.ok().body(results);
        } catch (AlreadySubscribedException e) {
            return ResponseEntity.badRequest().body(Error.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .time(LocalDateTime.now().toString())
                    .method(req.getMethod())
                    .path(req.getServletPath())
                    .message(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/foodExpires/unsubscribe")
    public ResponseEntity<Object> unsubscribe(HttpServletRequest req) {
        try {
            HashMap<String, String> results = new HashMap<>();
            notificationService.unsubscribe(new FoodExpiresSubscriber(session.getUser(), emailService, emailNotificationsProperties, fridgeRepository));
            results.put("message", "Successfully unsubscribed from food expires notification.");

            return ResponseEntity.ok().body(results);
        } catch (NotSubscribedException e) {
            return ResponseEntity.badRequest().body(Error.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .time(LocalDateTime.now().toString())
                    .method(req.getMethod())
                    .path(req.getServletPath())
                    .message(e.getMessage())
                    .build());
        }
    }
}
