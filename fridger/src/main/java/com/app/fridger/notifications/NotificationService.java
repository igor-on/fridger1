package com.app.fridger.notifications;

import com.app.fridger.entity.Notification;
import com.app.fridger.entity.User;
import com.app.fridger.exceptions.AlreadySubscribedException;
import com.app.fridger.exceptions.NotSubscribedException;
import com.app.fridger.model.NotificationType;
import com.app.fridger.repo.NotificationRepository;
import com.app.fridger.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final SubscriberCreator subscriberCreator;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository, SubscriberCreator subscriberCreator) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.subscriberCreator = subscriberCreator;
    }

    @Transactional
    public void subscribe(Subscriber subscriber, NotificationType notificationType) throws AlreadySubscribedException {
        Notification notification = notificationRepository.findByType(notificationType.getName()).orElseThrow();
        User user = userRepository.findByUsername(subscriber.getUsername()).orElseThrow();

        if (notification.getSubscribers().contains(user)) {
            throw new AlreadySubscribedException();
        }

        switch (notificationType) { // More soon...
            default:
            case FOOD_EXPIRES:
                notification.addSubscriber(user);
        }


        notificationRepository.save(notification);
    }

    @Transactional
    public void unsubscribe(Subscriber subscriber, NotificationType notificationType) throws NotSubscribedException {
        Notification notification = notificationRepository.findByType(notificationType.getName()).orElseThrow();
        User user = userRepository.findByUsername(subscriber.getUsername()).orElseThrow();

        if (!notification.getSubscribers().contains(user)) {
            throw new NotSubscribedException();
        }

        switch (notificationType) { // More soon...
            default:
            case FOOD_EXPIRES:
                notification.removeSubscriber(user);
        }
    }

    @Transactional
    @Scheduled(cron = "${mail.notifications.cron}", zone = "Europe/Warsaw")
    public void sendNotifications() {
        log.debug("Sending notifications!");
        notificationRepository.findAll().forEach(n -> {
            n.getSubscribers().forEach(s -> {
                subscriberCreator.create(FoodExpiresSubscriber.class, s).update();
            });
        });
//        subscribers.forEach(Subscriber::update);
    }
}
