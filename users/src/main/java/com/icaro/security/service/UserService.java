package com.icaro.security.service;

import com.icaro.security.model.LoginRequest;
import com.icaro.security.model.User;
import com.icaro.security.model.UserRegistrationRequest;
import com.icaro.security.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService {

    private static final String SECRET_KEY = "SlLMK53Rp3mQEQ38UWB2LpIEsBWvG/AnolSM1ZCl7Zk=";
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public void registerUser(UserRegistrationRequest request) {
        User existingUser = userRepository.findByEmail(request.getEmail());

        if (existingUser != null) {
            if (existingUser.isVerified()) {
                throw new RuntimeException("Email already registered and verified.");
            } else {
                // Update existing unverified user
                existingUser.setFirstName(request.getFirstName());
                existingUser.setLastName(request.getLastName());
                existingUser.setEncryptedPassword(request.getEncryptedPassword());
                existingUser.setVerificationToken(UUID.randomUUID().toString());
                existingUser.setVerificationTokenExpiry(LocalDateTime.now().plusMinutes(3)); // Set expiry

                // Update the createdAt field to the current time
                existingUser.setCreatedAt(LocalDateTime.now());

                userRepository.save(existingUser);
                //emailService.sendVerificationEmail(existingUser);
                return;
            }
        }

        // Register new user
        User user = new User();
        user.setFirstName(request.getFirstName()); // Updated
        user.setLastName(request.getLastName());   // Updated
        user.setEmail(request.getEmail());
        user.setEncryptedPassword(request.getEncryptedPassword());
        user.setVerified(false);
        user.setVerificationToken(UUID.randomUUID().toString());
        user.setVerificationTokenExpiry(LocalDateTime.now().plusMinutes(3)); // Set expiry

        // Set createdAt to the current time for a new user
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
        //emailService.sendVerificationEmail(user);
    }

    public void verifyUser(String token) {
        User user = userRepository.findByVerificationToken(token);
        if (user != null && !user.isVerified()) {
            if (user.getVerificationTokenExpiry().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification token has expired.");
            }
            user.setVerified(true);
            user.setVerificationToken(null);
            user.setVerificationTokenExpiry(null); // Clear expiry after verification
            userRepository.save(user);
        } else {
            throw new RuntimeException("Invalid or expired token.");
        }
    }

    public String loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found.");
        }

        //if (!user.isVerified()) {
        //    throw new RuntimeException("User email not verified.");
        //}

        if (!user.getEncryptedPassword().equals(request.getEncryptedPassword())) {
            throw new RuntimeException("Invalid password.");
        }

        // Authentication successful, generate JWT token
        return generateToken(user);
    }

    private String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", user.getEmail());
        claims.put("role", "USER"); // Adjust as needed

        try {
            return Jwts.builder()
                    .setClaims(claims)
                    .setSubject(String.valueOf(user.getId()))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours expiration
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                    .compact();
        } catch (Exception e) {
            logger.error("Token generation failed: ", e);
            throw new RuntimeException("Token generation failed: " + e.getMessage());
        }
    }

    public void processForgotPassword(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setVerificationToken(UUID.randomUUID().toString());
            userRepository.save(user);
           // emailService.sendPasswordResetEmail(user);
        } else {
            throw new RuntimeException("User not found.");
        }
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByVerificationToken(token);
        if (user != null) {
            user.setEncryptedPassword(newPassword);
            user.setVerificationToken(null);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Invalid or expired token.");
        }
    }

    @Scheduled(fixedRate = 120000) // 2 minutes
    public void deleteExpiredUnverifiedUsers() {
        LocalDateTime now = LocalDateTime.now();
        logger.info("Running scheduled task to delete unverified users. Current time: {}", now);
        userRepository.deleteAllByIsVerifiedFalseAndVerificationTokenExpiryBefore(now);
        logger.info("Unverified users with expired tokens have been deleted.");
    }
}
