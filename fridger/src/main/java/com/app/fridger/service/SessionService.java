package com.app.fridger.service;

import com.app.fridger.config.UserDetailsImpl;
import com.app.fridger.entity.User;
import com.app.fridger.repo.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class SessionService {

    @Autowired
    private UserRepository userRepository;


    public User getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetailsImpl) {
            return userRepository.findByUsername(auth.getName()).orElseThrow();
        }

        throw new RuntimeException("There is no active user in this session");
    }


}
