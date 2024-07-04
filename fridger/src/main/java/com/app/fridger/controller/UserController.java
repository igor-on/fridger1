package com.app.fridger.controller;

import com.app.fridger.config.UserDetailsServiceImpl;
import com.app.fridger.dto.AuthRequest;
import com.app.fridger.dto.AuthResponse;
import com.app.fridger.entity.User;
import com.app.fridger.model.TokenData;
import com.app.fridger.repo.UserRepository;
import com.app.fridger.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/auth")
public class UserController {

    private final UserRepository userRepository;

    private final UserDetailsServiceImpl userDetailsService;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;


    @GetMapping("/user/{username}")
    @PreAuthorize("#username == authentication.name")
    public User getUser(@PathVariable  String username) {
        log.info("get User endpoint");
        return userRepository.findByUsername(username).orElseThrow();
    }

    @PostMapping("/addNewUser")
    public String addNewUser(@RequestBody User user) {
        return userDetailsService.addUser(user);
    }

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
                    .username(authRequest.getUsername())
                    .tokenData(tokenData)
                    .build();
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}
