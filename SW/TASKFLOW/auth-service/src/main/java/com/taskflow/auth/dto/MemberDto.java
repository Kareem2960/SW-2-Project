package com.taskflow.auth.dto;

import lombok.Data;

@Data
public class MemberDto {
    private Integer userId;
    private String userName;
    private String firstName;
    private String lastName;
}
