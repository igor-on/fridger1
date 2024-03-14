package com.app.fridger.controller;

import com.app.fridger.config.UserDetailsServiceImpl;
import com.app.fridger.dto.AuthRequest;
import com.app.fridger.entity.User;
import com.app.fridger.repo.UserRepository;
import com.app.fridger.service.JwtService;
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

    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}
