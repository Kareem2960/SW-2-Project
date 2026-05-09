package com.taskflow.project.service;

import com.taskflow.project.dto.*;

import java.util.List;

public interface ProjectService {
    ProjectDto createProject(CreateProjectDto dto, Integer managerId);
    List<ProjectDto> getAllProjects();
    ProjectDto getProjectById(Integer id);
    List<ProjectDto> getProjectsByManager(Integer managerId);
    ProjectDto updateProject(Integer id, CreateProjectDto dto);
    void deleteProject(Integer id);
    void addMember(Integer projectId, AddMemberDto dto);
    void removeMember(Integer projectId, Integer userId);
    List<ProjectDto> getMyProjects(Integer userId);
}
