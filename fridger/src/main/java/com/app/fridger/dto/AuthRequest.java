package com.app.fridger.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class AuthRequest {

    private String username;
    private String password;
}
