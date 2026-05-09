package com.taskflow.auth.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDto {

    private Integer id;
    private String userName;
    private String firstName;
    private String lastName;
    private Integer age;
    private Boolean isApproved;
    private List<String> roles;
}
