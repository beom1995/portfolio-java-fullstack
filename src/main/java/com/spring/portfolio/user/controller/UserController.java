package com.spring.portfolio.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.portfolio.user.dto.SignupRequest;
import com.spring.portfolio.user.dto.UserResponse;
import com.spring.portfolio.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@RequestBody SignupRequest signupRequest) {
    	System.out.println(signupRequest);
        UserResponse userResponse = userService.signup(signupRequest.getUserName(), signupRequest.getUserPassword());
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }
}