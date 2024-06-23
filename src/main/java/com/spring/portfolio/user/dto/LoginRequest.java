package com.spring.portfolio.user.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String userName;
    private String userPassword;
}
