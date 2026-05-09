package com.taskflow.project.service;

import com.taskflow.project.dto.DashboardStatsDto;
import com.taskflow.project.repository.ProjectMemberRepository;
import com.taskflow.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    @Override
    public DashboardStatsDto getStats(Integer userId) {
        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setTotalProjects(projectRepository.count());
        stats.setTotalMembers(projectMemberRepository.count());
        stats.setProjectsManaged(projectRepository.countByManagerId(userId));
        return stats;
    }
}
