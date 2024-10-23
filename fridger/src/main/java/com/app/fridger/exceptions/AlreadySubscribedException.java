package com.app.fridger.exceptions;


public class AlreadySubscribedException extends Exception{

    public AlreadySubscribedException() {
        super("Subscriber already subscribed to this notification");
    }
}
