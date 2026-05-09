package com.taskflow.auth.security;

import com.taskflow.auth.entity.User;
import com.taskflow.auth.repository.RolePermissionRepository;
import com.taskflow.auth.repository.UserRepository;
import com.taskflow.auth.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final RolePermissionRepository rolePermissionRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        var userRoles = userRoleRepository.findByUserId(user.getId());
        List<String> roles = userRoles.stream()
                .map(ur -> ur.getRole().getName())
                .collect(Collectors.toList());

        List<String> permissions = userRoles.stream()
                .flatMap(ur -> rolePermissionRepository.findByRoleId(ur.getRole().getId()).stream())
                .map(rp -> rp.getPermission())
                .distinct()
                .collect(Collectors.toList());

        return UserDetailsImpl.build(user, roles, permissions);
    }
}
