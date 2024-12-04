package com.icaro.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF (for APIs; ensure to enable CSRF in forms)
                .cors(Customizer.withDefaults()) // Enable CORS with default settings
                .authorizeHttpRequests(authorize -> authorize
                        // Public endpoints (including H2 console)
                        .requestMatchers("/h2-console/**",
                                "/api/v1/auth/register",
                                "/api/v1/auth/verify",
                                "/api/v1/auth/login",
                                "/api/v1/auth/reset-password").permitAll()
                        .anyRequest().authenticated() // All other endpoints require authentication
                )
                .headers(headers -> headers
                        .xssProtection(Customizer.withDefaults()) // Enable XSS protection
                        .frameOptions(frameOptions -> frameOptions.sameOrigin()) // Allow frames from the same origin
                );

        return http.build();
    }
}