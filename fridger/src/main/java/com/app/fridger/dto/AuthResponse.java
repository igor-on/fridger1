package com.app.fridger.dto;

import com.app.fridger.model.TokenData;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthResponse {

    public String username;
    public TokenData tokenData;
}
