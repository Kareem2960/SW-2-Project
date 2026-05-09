package com.taskflow.project.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddMemberDto {

    @NotNull
    private Integer userId;
}
