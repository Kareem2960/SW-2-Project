package com.taskflow.project.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProjectDto {

    private Integer id;
    private String name;
    private Integer managerId;
    private List<MemberDto> members;
}
