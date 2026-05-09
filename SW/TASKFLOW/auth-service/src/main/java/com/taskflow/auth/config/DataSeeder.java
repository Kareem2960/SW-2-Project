package com.taskflow.auth.config;

import com.taskflow.auth.entity.*;
import com.taskflow.auth.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        seedRoles();
        seedDefaultUsers();
    }

    private void seedRoles() {
        if (roleRepository.count() == 0) {
            Role adminRole = Role.builder()
                    .name("Admin")
                    .description("System Administrator")
                    .build();
            roleRepository.save(adminRole);

            Role userRole = Role.builder()
                    .name("User")
                    .description("Standard User")
                    .build();
            roleRepository.save(userRole);

            Role managerRole = Role.builder()
                    .name("Manager")
                    .description("Project Manager")
                    .build();
            roleRepository.save(managerRole);

            RolePermission adminPerm1 = RolePermission.builder()
                    .role(adminRole)
                    .permission("users.manage")
                    .build();
            rolePermissionRepository.save(adminPerm1);

            RolePermission adminPerm2 = RolePermission.builder()
                    .role(adminRole)
                    .permission("roles.manage")
                    .build();
            rolePermissionRepository.save(adminPerm2);

            RolePermission managerPerm = RolePermission.builder()
                    .role(managerRole)
                    .permission("projects.manage")
                    .build();
            rolePermissionRepository.save(managerPerm);
        }
    }

    private void seedDefaultUsers() {
        seedOrRepairUser("admin", "admin123", "System", "Administrator", 30, "Admin");
        seedOrRepairUser("manager", "admin123", "Project", "Manager", 28, "Manager");
        seedOrRepairUser("user", "admin123", "Regular", "User", 25, "User");
    }

    private void seedOrRepairUser(
            String userName,
            String rawPassword,
            String firstName,
            String lastName,
            Integer age,
            String roleName
    ) {
        Role role = roleRepository.findByName(roleName).orElseThrow();
        User user = userRepository.findByUserName(userName).orElse(null);

        if (user == null) {
            user = User.builder()
                    .userName(userName)
                    .passwordHash(passwordEncoder.encode(rawPassword))
                    .firstName(firstName)
                    .lastName(lastName)
                    .age(age)
                    .isApproved(true)
                    .build();
            user = userRepository.save(user);
        } else {
            boolean needsUpdate = false;

            // Repair legacy hashes imported from old environments (non-BCrypt).
            if (user.getPasswordHash() == null || !user.getPasswordHash().startsWith("$2")) {
                user.setPasswordHash(passwordEncoder.encode(rawPassword));
                needsUpdate = true;
            }
            if (!Boolean.TRUE.equals(user.getIsApproved())) {
                user.setIsApproved(true);
                needsUpdate = true;
            }

            if (needsUpdate) {
                user = userRepository.save(user);
            }
        }

        boolean hasRole = userRoleRepository.findByUserId(user.getId()).stream()
                .anyMatch(ur -> ur.getRole().getName().equals(roleName));
        if (!hasRole) {
            userRoleRepository.save(UserRole.builder()
                    .user(user)
                    .role(role)
                    .build());
        }
    }
}
