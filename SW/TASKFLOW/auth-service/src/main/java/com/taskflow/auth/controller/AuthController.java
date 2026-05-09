package com.taskflow.auth.controller;

import com.taskflow.auth.dto.*;
import com.taskflow.auth.entity.User;
import com.taskflow.auth.repository.UserRepository;
import com.taskflow.auth.repository.UserRoleRepository;
import com.taskflow.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication endpoints")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    @Operation(summary = "Login user")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current user info")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(authService.getCurrentUser(userDetails.getUsername()));
    }

    @GetMapping("/members")
    @Operation(summary = "Get all approved users with User role (members)")
    public ResponseEntity<List<MemberDto>> getMembers() {
        List<User> members = userRepository.findByRoleNameAndApproved("User");
        List<MemberDto> memberDtos = members.stream()
                .map(user -> {
                    MemberDto dto = new MemberDto();
                    dto.setUserId(user.getId());
                    dto.setUserName(user.getUserName());
                    dto.setFirstName(user.getFirstName());
                    dto.setLastName(user.getLastName());
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(memberDtos);
    }
}
