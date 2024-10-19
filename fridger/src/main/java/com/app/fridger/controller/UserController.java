package com.app.fridger.controller;

import com.app.fridger.auth.UserDetailsServiceImpl;
import com.app.fridger.dto.UserDTO;
import com.app.fridger.entity.User;
import com.app.fridger.model.Error;
import com.app.fridger.repo.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("${fridger.request-map}")
public class UserController {
    private final UserRepository userRepository;

    private final UserDetailsServiceImpl userDetailsService;
    @GetMapping("/user/{username}")
    @PreAuthorize("#username == authentication.name")
    public UserDTO getUser(@PathVariable String username) {
        log.info("get User endpoint");
        return UserDTO.fromEntity(userRepository.findByUsername(username).orElseThrow());
    }

    @GetMapping("/user/{username}/profilePicture")
    public ResponseEntity<Object> getUserProfileImage(HttpServletRequest req, @PathVariable String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        byte[] profilePicture = user.getProfilePicture();
        if (profilePicture != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "image/jpeg"); // or the appropriate image type
            return new ResponseEntity<>(profilePicture, headers, HttpStatus.OK);
        }

        return ResponseEntity.badRequest().body(Error.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .time(LocalDateTime.now().toString())
                .method(req.getMethod())
                .path(req.getServletPath())
                .message("User doesn't have profile picture")
                .build());
    };


    @PostMapping("/user/{username}/profilePicture/upload")
    @PreAuthorize("#username == authentication.name")
    @Transactional
    public UserDTO uploadProfilePicture(@PathVariable String username, @RequestParam("file") MultipartFile multipartImage) throws IOException {
        User user = userRepository.findByUsername(username).orElseThrow();
        user.setProfilePicture(multipartImage.getBytes());

        return UserDTO.fromEntity(user);
    }

    @PostMapping("/user/new")
    public String addNewUser(@RequestBody User user) {
        return userDetailsService.addUser(user);
    }
}
