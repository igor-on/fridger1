package com.app.fridger.dto;

import com.app.fridger.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate joined;

    public static UserDTO fromEntity(User user) {
        return new UserDTO(user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(), user.getJoined());
    }
}
