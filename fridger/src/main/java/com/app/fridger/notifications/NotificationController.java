package com.app.fridger.notifications;

import com.app.fridger.exceptions.AlreadySubscribedException;
import com.app.fridger.exceptions.NotSubscribedException;
import com.app.fridger.model.core.NotificationType;
import com.app.fridger.service.SessionService;
import com.app.fridger.utils.Utils;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;

@Controller
@Log4j2
@RequiredArgsConstructor
@RequestMapping("${fridger.request-map}/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final SubscriberCreator subscriberCreator;
    private final SessionService session;


    @GetMapping("/foodExpires/subscribe")
    public ResponseEntity<Object> subscribe(HttpServletRequest req) {
        try {
            HashMap<String, String> results = new HashMap<>();

            notificationService.subscribe(subscriberCreator.create(FoodExpiresSubscriber.class, session.getUser()), NotificationType.FOOD_EXPIRES);
            results.put("message", "Successfully subscribed to food expires notification.");

            return ResponseEntity.ok().body(results);
        } catch (AlreadySubscribedException e) {
            return Utils.createErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), req);
        }
    }

    @GetMapping("/foodExpires/unsubscribe")
    public ResponseEntity<Object> unsubscribe(HttpServletRequest req) {
        try {
            HashMap<String, String> results = new HashMap<>();
            notificationService.unsubscribe(subscriberCreator.createFoodExpiresSubscriber(session.getUser()), NotificationType.FOOD_EXPIRES);
            results.put("message", "Successfully unsubscribed from food expires notification.");

            return ResponseEntity.ok().body(results);
        } catch (NotSubscribedException e) {
            return Utils.createErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), req);
        }
    }
}
