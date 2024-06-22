package com.spring.portfolio.user.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String userName;
    private String userPassword;
}