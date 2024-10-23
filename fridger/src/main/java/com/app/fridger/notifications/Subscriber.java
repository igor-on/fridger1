package com.app.fridger.notifications;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode(of = {"username"})
@ToString
public abstract class Subscriber implements ISubscriber {

    private String username;

    public Subscriber(String username) {
        this.username = username;
    }

}
