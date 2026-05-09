package com.taskflow.project.service;

import com.taskflow.project.dto.DashboardStatsDto;

public interface DashboardService {
    DashboardStatsDto getStats(Integer userId);
}
