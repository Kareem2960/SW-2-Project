package com.taskflow.auth.service;

import com.taskflow.auth.dto.*;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    UserDto getCurrentUser(String username);
}
