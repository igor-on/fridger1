package com.app.fridger.exceptions;

public class NotSubscribedException extends Exception{

    public NotSubscribedException() {
        super("Cannot unsubscribe because Subscriber does not have notification subscription");
    }
}
