package com.taskflow.project.dto;

import lombok.Data;

@Data
public class DashboardStatsDto {

    private Long totalProjects;
    private Long totalMembers;
    private Long projectsManaged;
}
