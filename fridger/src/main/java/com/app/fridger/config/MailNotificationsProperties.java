package com.app.fridger.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "mail.notifications")
public class MailNotificationsProperties {

    Ingredients ingredients;


    @Data
    public static class Ingredients {
        private long expireMsgBeforeDays;
    }
}
