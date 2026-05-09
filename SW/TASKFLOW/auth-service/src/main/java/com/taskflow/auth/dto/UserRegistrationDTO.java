package com.taskflow.auth.dto;

import lombok.*;

/**
 * Data Transfer Object for User Registration
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegistrationDTO {

    @NonNull
    private String userName;

    @NonNull
    private String passwordHash;

    private String firstName;

    private String lastName;

    private Integer age;

    private String email;

    private Boolean isApproved;
}
