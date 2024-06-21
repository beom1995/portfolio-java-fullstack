package com.spring.portfolio.user.repository;

import com.spring.portfolio.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUserName(String userName);
    Optional<User> findByUserName(String userName);
}