package com.spring.portfolio.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.portfolio.user.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUserName(String userName);
    
    Optional<User> findByUserName(String userName);
}