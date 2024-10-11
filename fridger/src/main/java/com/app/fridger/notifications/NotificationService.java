package com.app.fridger.notifications;

import com.app.fridger.entity.Notification;
import com.app.fridger.entity.User;
import com.app.fridger.exceptions.AlreadySubscribedException;
import com.app.fridger.exceptions.NotSubscribedException;
import com.app.fridger.model.NotificationType;
import com.app.fridger.repo.NotificationRepository;
import com.app.fridger.repo.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final List<Subscriber> subscribers = new ArrayList<>();

    @PostConstruct
    public void print() {
        log.debug("Subscribers: " + subscribers);
    }

    @Transactional
    public void subscribe(Subscriber subscriber, NotificationType notificationType) throws AlreadySubscribedException {
        if (subscribers.contains(subscriber)) {
            throw new AlreadySubscribedException();
        }

        Notification notification = notificationRepository.findByType(notificationType.getName()).orElseThrow();
        User user = userRepository.findByUsername(subscriber.getUsername()).orElseThrow();
        switch (notificationType) { // More soon...
            default:
            case FOOD_EXPIRES:
                notification.addSubscriber(user);
        }


        notificationRepository.save(notification);
        subscribers.add(subscriber);
    }

    @Transactional
    public void unsubscribe(Subscriber subscriber, NotificationType notificationType) throws NotSubscribedException {
        if (!subscribers.contains(subscriber)) {
            throw new NotSubscribedException();
        }

        Notification notification = notificationRepository.findByType(notificationType.getName()).orElseThrow();
        User user = userRepository.findByUsername(subscriber.getUsername()).orElseThrow();
        switch (notificationType) { // More soon...
            default:
            case FOOD_EXPIRES:
                notification.removeSubscriber(user);
        }



        subscribers.remove(subscriber);
    }

    @Transactional
    @Scheduled(cron = "${mail.notifications.cron}", zone = "Europe/Warsaw")
    public void sendNotifications() {
        log.debug("Sending notifications!");
        subscribers.forEach(Subscriber::update);
    }
}
