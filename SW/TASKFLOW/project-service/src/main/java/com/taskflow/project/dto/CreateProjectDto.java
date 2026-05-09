package com.taskflow.project.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateProjectDto {

    @NotBlank
    private String name;
}
