package com.app.fridger.model;

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
