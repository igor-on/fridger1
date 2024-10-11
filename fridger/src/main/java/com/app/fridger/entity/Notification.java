package com.app.fridger.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Table(name = "notifications")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "type")
    private String type;

    @ManyToMany
    @JoinTable(
            name = "notification_subscribers",
            joinColumns = @JoinColumn(name = "notification_id"),
            inverseJoinColumns = @JoinColumn(name = "username")
    )
    private Set<User> subscribers;

    public void addSubscriber(User user) {
        if (user != null) {
            if (subscribers == null) {
                subscribers = new HashSet<>();
            }
            subscribers.add(user);
        }
    }

    public void removeSubscriber(User user) {
        subscribers.remove(user);
    }
}
