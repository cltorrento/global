package com.icaro.security.repository;


import com.icaro.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByVerificationToken(String token);
    void deleteAllByIsVerifiedFalseAndVerificationTokenExpiryBefore(LocalDateTime expiryDate);
}
