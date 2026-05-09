package com.taskflow.auth.controller;

import com.taskflow.auth.dto.UserDto;
import com.taskflow.auth.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('Admin')")
@Tag(name = "Admin", description = "Admin management endpoints")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    @Operation(summary = "List all users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/pending-managers")
    @Operation(summary = "Pending manager registrations awaiting approval")
    public ResponseEntity<List<UserDto>> getPendingManagers() {
        return ResponseEntity.ok(adminService.getPendingManagers());
    }

    @GetMapping("/pending-users")
    @Operation(summary = "Get all pending users")
    public ResponseEntity<List<UserDto>> getPendingUsers() {
        return ResponseEntity.ok(adminService.getPendingUsers());
    }

    @PostMapping("/approve/{userId}")
    @Operation(summary = "Approve a user")
    public ResponseEntity<UserDto> approveUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(adminService.approveUser(userId));
    }

    @PostMapping("/reject/{userId}")
    @Operation(summary = "Reject registration (delete pending user)")
    public ResponseEntity<Void> rejectUser(@PathVariable Integer userId) {
        adminService.rejectUser(userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/{userId}/roles")
    @Operation(summary = "Assign role to user")
    public ResponseEntity<Void> assignRole(@PathVariable Integer userId, @RequestBody Map<String, String> request) {
        adminService.assignRole(userId, request.get("roleName"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/{userId}/roles/{roleName}")
    @Operation(summary = "Remove role from user")
    public ResponseEntity<Void> removeRole(@PathVariable Integer userId, @PathVariable String roleName) {
        adminService.removeRole(userId, roleName);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/roles/{roleName}/permissions")
    @Operation(summary = "Add permission to role")
    public ResponseEntity<Void> addPermission(@PathVariable String roleName, @RequestBody Map<String, String> request) {
        adminService.addPermission(roleName, request.get("permission"));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/roles/{roleName}/permissions/{permission}")
    @Operation(summary = "Remove permission from role")
    public ResponseEntity<Void> removePermission(@PathVariable String roleName, @PathVariable String permission) {
        adminService.removePermission(roleName, permission);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/roles/{roleName}/permissions")
    @Operation(summary = "Get role permissions")
    public ResponseEntity<List<String>> getRolePermissions(@PathVariable String roleName) {
        return ResponseEntity.ok(adminService.getRolePermissions(roleName));
    }
}
