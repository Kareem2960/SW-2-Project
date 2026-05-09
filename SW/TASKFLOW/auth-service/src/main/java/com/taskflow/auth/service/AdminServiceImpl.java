package com.taskflow.auth.service;

import com.taskflow.auth.dto.UserDto;
import com.taskflow.auth.entity.*;
import com.taskflow.auth.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final RolePermissionRepository rolePermissionRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getPendingManagers() {
        return userRepository.findAll().stream()
                .filter(u -> !Boolean.TRUE.equals(u.getIsApproved()))
                .filter(u -> userRoleRepository.findByUserId(u.getId()).stream()
                        .anyMatch(ur -> "Manager".equals(ur.getRole().getName())))
                .map(this::mapToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getPendingUsers() {
        return userRepository.findAll().stream()
                .filter(u -> !u.getIsApproved())
                .map(this::mapToUserDto)
                .collect(Collectors.toList());
    }

    @Override
    public void rejectUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }

    @Override
    public UserDto approveUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setIsApproved(true);
        return mapToUserDto(userRepository.save(user));
    }

    @Override
    public void assignRole(Integer userId, String roleName) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        boolean hasRole = userRoleRepository.findByUserId(userId).stream()
                .anyMatch(ur -> ur.getRole().getName().equals(roleName));

        if (!hasRole) {
            UserRole userRole = UserRole.builder()
                    .user(user)
                    .role(role)
                    .build();
            userRoleRepository.save(userRole);
        }
    }

    @Override
    public void removeRole(Integer userId, String roleName) {
        userRoleRepository.findByUserId(userId).stream()
                .filter(ur -> ur.getRole().getName().equals(roleName))
                .findFirst()
                .ifPresent(userRoleRepository::delete);
    }

    @Override
    public void addPermission(String roleName, String permission) {
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        RolePermission rp = RolePermission.builder()
                .role(role)
                .permission(permission)
                .build();
        rolePermissionRepository.save(rp);
    }

    @Override
    public void removePermission(String roleName, String permission) {
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        rolePermissionRepository.findByRoleId(role.getId()).stream()
                .filter(rp -> rp.getPermission().equals(permission))
                .findFirst()
                .ifPresent(rolePermissionRepository::delete);
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getRolePermissions(String roleName) {
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        return rolePermissionRepository.findByRoleId(role.getId()).stream()
                .map(RolePermission::getPermission)
                .collect(Collectors.toList());
    }

    private UserDto mapToUserDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUserName(user.getUserName());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setAge(user.getAge());
        dto.setIsApproved(user.getIsApproved());
        dto.setRoles(userRoleRepository.findByUserId(user.getId()).stream()
                .map(ur -> ur.getRole().getName())
                .collect(Collectors.toList()));
        return dto;
    }
}
