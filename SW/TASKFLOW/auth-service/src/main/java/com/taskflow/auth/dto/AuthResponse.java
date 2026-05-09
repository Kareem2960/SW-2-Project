package com.taskflow.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String userName;
    private List<String> roles;
    private Boolean isApproved;
}
