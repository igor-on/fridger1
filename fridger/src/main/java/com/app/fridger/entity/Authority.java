//package com.app.fridger.entity;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.springframework.security.core.GrantedAuthority;
//
//@Table(name = "authorities")
//@Entity
//@NoArgsConstructor
//@Getter
//@Setter
//public class Authority implements GrantedAuthority {
//
//    @ManyToOne
//    @Column(name = "username")
//    @JsonIgnore
//    private User username;
//    @Column(name = "authority")
//    private String authority;
//}
