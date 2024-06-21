package com.spring.portfolio.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public UserResponse signup(String userName, String userPassword) {
        if (userRepository.existsByUserName(userName)) {
            throw new DuplicateUserNameException("이미 존재하는 사용자입니다.");
        }

        User user = User.builder()
                .userName(userName)
                .userPw(userPassword)
                .build();
        User savedUser = userRepository.save(user);

        return convertToUserResponse(savedUser);
    }

    public UserResponse login(String userName, String userPassword) {
        User user = userRepository.findByUserName(userName)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        if (!user.getUserPw().equals(userPassword)) {
            throw new InvalidPasswordException("비밀번호가 일치하지 않습니다.");
        }

        return convertToUserResponse(user);
    }

    public UserResponse getUserById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("사용자를 찾을 수 없습니다."));
        return convertToUserResponse(user);
    }

    private UserResponse convertToUserResponse(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .build();
    }
}