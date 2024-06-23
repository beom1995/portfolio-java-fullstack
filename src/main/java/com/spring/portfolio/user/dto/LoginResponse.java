package com.spring.portfolio.user.dto;

import lombok.Getter;

@Getter
public class LoginResponse {
    private String token;
    private String username;

}