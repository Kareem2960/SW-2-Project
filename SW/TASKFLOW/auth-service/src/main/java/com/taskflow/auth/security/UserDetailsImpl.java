package com.taskflow.auth.security;

import com.taskflow.auth.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private Integer id;
    private String username;
    private String password;
    private Boolean isApproved;
    private Collection<? extends GrantedAuthority> authorities;

    public static UserDetailsImpl build(User user, List<String> roles, List<String> permissions) {
        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());

        authorities.addAll(permissions.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList()));

        return new UserDetailsImpl(
                user.getId(),
                user.getUserName(),
                user.getPasswordHash(),
                user.getIsApproved(),
                authorities
        );
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Do not block authentication at Spring Security layer.
        // Approval state can still be exposed to frontend/business logic if needed.
        return true;
    }
}
