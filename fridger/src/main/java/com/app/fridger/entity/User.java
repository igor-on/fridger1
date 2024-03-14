package com.app.fridger.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@Table(name = "users")
@Entity
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    @NotNull
    private String password;
    @Column(name = "roles")
    private String roles;
    @Column(name = "enabled")
    private Boolean enabled;
}
