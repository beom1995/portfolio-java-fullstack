package com.spring.portfolio.user.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.portfolio.common.security.JwtTokenProvider;
import com.spring.portfolio.user.dto.UserResponse;
import com.spring.portfolio.user.entity.User;
import com.spring.portfolio.user.exception.DuplicateUserNameException;
import com.spring.portfolio.user.exception.InvalidPasswordException;
import com.spring.portfolio.user.exception.UserNotFoundException;
import com.spring.portfolio.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponse signup(String userName, String userPassword) {
        if (userRepository.existsByUserName(userName)) {
            throw new DuplicateUserNameException("이미 존재하는 사용자입니다.");
        }
        User user = User.builder()
                .userName(userName)
                .userPw(passwordEncoder.encode(userPassword))
                .build();
        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.createToken(savedUser.getUserId());
        return convertToUserResponse(savedUser, token);
    }

    public UserResponse login(String userName, String userPassword) {
        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        if (!passwordEncoder.matches(userPassword, user.getUserPw())) {
            throw new InvalidPasswordException("비밀번호가 일치하지 않습니다.");
        }

        String token = jwtTokenProvider.createToken(user.getUserId());
        return convertToUserResponse(user, token);
    }

    public UserResponse getUserById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        String token = jwtTokenProvider.createToken(user.getUserId());
        return convertToUserResponse(user, token);
    }

    private UserResponse convertToUserResponse(User user, String token) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .token(token)
                .build();
    }
}