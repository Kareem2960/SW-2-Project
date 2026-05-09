package com.taskflow.auth.service;

import com.taskflow.auth.dto.UserDto;

import java.util.List;

public interface AdminService {
    List<UserDto> getAllUsers();
    List<UserDto> getPendingManagers();
    List<UserDto> getPendingUsers();
    UserDto approveUser(Integer userId);
    void rejectUser(Integer userId);
    void assignRole(Integer userId, String roleName);
    void removeRole(Integer userId, String roleName);
    void addPermission(String roleName, String permission);
    void removePermission(String roleName, String permission);
    List<String> getRolePermissions(String roleName);
}
