package com.app.fridger.service;

import com.app.fridger.exceptions.AlreadySubscribedException;
import com.app.fridger.exceptions.NotSubscribedException;
import com.app.fridger.model.Subscriber;
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

    private final List<Subscriber> subscribers = new ArrayList<>();

    public void subscribe(Subscriber subscriber) throws AlreadySubscribedException {
        if (subscribers.contains(subscriber)) {
            throw new AlreadySubscribedException();
        }
        subscribers.add(subscriber);
    }

    public void unsubscribe(Subscriber subscriber) throws NotSubscribedException {
        if (!subscribers.contains(subscriber)) {
            throw new NotSubscribedException();
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
