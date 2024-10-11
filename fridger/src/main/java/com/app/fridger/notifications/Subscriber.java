package com.app.fridger.notifications;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(of = {"username"})
public abstract class Subscriber implements ISubscriber {

    private String username;

    public Subscriber(String username) {
        this.username = username;
    }

}
