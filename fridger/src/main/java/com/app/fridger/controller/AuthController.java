package com.app.fridger.controller;

import com.app.fridger.auth.JwtService;
import com.app.fridger.auth.TokenData;
import com.app.fridger.dto.AuthRequest;
import com.app.fridger.dto.AuthResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;


    @GetMapping("/refresh-token")
    public TokenData refreshToken(@CookieValue("refresh-token") String refreshToken) {
        log.info("RefreshToken: " + refreshToken);
        return jwtService.refreshAccessToken(refreshToken);
    }

    @PostMapping("/authenticate")
    public AuthResponse authenticateAndGetToken(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            TokenData tokenData = jwtService.generateToken(authRequest.getUsername());

            String refreshToken = jwtService.generateRefreshToken(authRequest.getUsername());
            Cookie jwtRefreshTokenCookie = new Cookie("refresh-token", refreshToken);
            jwtRefreshTokenCookie.setHttpOnly(true);
            response.addCookie(jwtRefreshTokenCookie);

            return AuthResponse.builder()
                    .token(tokenData.getToken())
                    .build();
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}
