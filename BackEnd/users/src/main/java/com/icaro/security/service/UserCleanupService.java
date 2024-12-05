package com.icaro.security.service;

import com.icaro.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserCleanupService {

    @Autowired
    private UserRepository userRepository;

    // Schedule the task to run every hour (adjust the cron expression as needed)
    @Scheduled(cron = "0 0 * * * *")
    public void deleteUnverifiedUsers() {
        LocalDateTime now = LocalDateTime.now();
        userRepository.deleteAllByIsVerifiedFalseAndVerificationTokenExpiryBefore(now);
    }
}