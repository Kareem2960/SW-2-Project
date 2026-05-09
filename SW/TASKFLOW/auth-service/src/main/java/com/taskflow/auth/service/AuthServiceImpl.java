package com.taskflow.auth.service;

import com.taskflow.auth.dto.*;
import com.taskflow.auth.entity.*;
import com.taskflow.auth.repository.*;
import com.taskflow.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUserName(request.getUserName())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Username already exists");
        }

        // Determine role based on request
        String roleName = "User"; // default
        boolean isApproved = true;
        
        System.out.println("DEBUG: Request role = " + request.getRole());
        
        if (request.getRole() != null) {
            if (request.getRole().equalsIgnoreCase("manager")) {
                roleName = "Manager";
                isApproved = false; // Managers need admin approval
                System.out.println("DEBUG: Assigned Manager role");
            } else if (request.getRole().equalsIgnoreCase("member")) {
                roleName = "User"; // Frontend "member" maps to backend "User"
                isApproved = true; // Members are auto-approved
                System.out.println("DEBUG: Assigned User role");
            }
        }
        
        System.out.println("DEBUG: Final roleName = " + roleName + ", isApproved = " + isApproved);
        
        final String finalRoleName = roleName;

        User user = User.builder()
                .userName(request.getUserName())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .age(request.getAge())
                .isApproved(isApproved)
                .build();

        user = userRepository.save(user);

        Role userRole = roleRepository.findByName(finalRoleName)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Role not found: " + finalRoleName));

        UserRole userRoleEntity = UserRole.builder()
                .user(user)
                .role(userRole)
                .build();
        userRoleRepository.save(userRoleEntity);

        String token = jwtUtil.generateToken(user.getUserName(), user.getId());

        return new AuthResponse(
                token,
                user.getUserName(),
                List.of(finalRoleName),
                user.getIsApproved()
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
        );

        User user = userRepository.findByUserName(request.getUserName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"));

        List<String> roles = userRoleRepository.findByUserId(user.getId()).stream()
                .map(ur -> ur.getRole().getName())
                .collect(Collectors.toList());

        String token = jwtUtil.generateToken(user.getUserName(), user.getId());

        return new AuthResponse(
                token,
                user.getUserName(),
                roles,
                user.getIsApproved()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getCurrentUser(String username) {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"));

        List<String> roles = userRoleRepository.findByUserId(user.getId()).stream()
                .map(ur -> ur.getRole().getName())
                .collect(Collectors.toList());

        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUserName(user.getUserName());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setAge(user.getAge());
        dto.setIsApproved(user.getIsApproved());
        dto.setRoles(roles);
        return dto;
    }
}
