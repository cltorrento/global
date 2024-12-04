package com.icaro.security.model;

public class LoginResponse {
    private String message;
    private String token;

    private Integer status;

    public LoginResponse(String message, String token, Integer status) {
        this.message = message;
        this.token = token;
        this.status = status;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

}