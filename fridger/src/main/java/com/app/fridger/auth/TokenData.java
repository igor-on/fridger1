package com.app.fridger.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class TokenData {

    private String token;
    private LocalDateTime expirationDate;
}
