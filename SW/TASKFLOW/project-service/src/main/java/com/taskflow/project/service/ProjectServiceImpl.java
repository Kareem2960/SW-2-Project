package com.taskflow.project.service;

import com.taskflow.project.dto.*;
import com.taskflow.project.entity.Project;
import com.taskflow.project.entity.ProjectMember;
import com.taskflow.project.repository.ProjectMemberRepository;
import com.taskflow.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    @Override
    public ProjectDto createProject(CreateProjectDto dto, Integer managerId) {
        Project project = Project.builder()
                .name(dto.getName())
                .managerId(managerId)
                .build();

        project = projectRepository.save(project);
        return mapToDto(project);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectDto getProjectById(Integer id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return mapToDto(project);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> getProjectsByManager(Integer managerId) {
        return projectRepository.findByManagerId(managerId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectDto updateProject(Integer id, CreateProjectDto dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setName(dto.getName());
        return mapToDto(projectRepository.save(project));
    }

    @Override
    public void deleteProject(Integer id) {
        projectRepository.deleteById(id);
    }

    @Override
    public void addMember(Integer projectId, AddMemberDto dto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        projectMemberRepository.findByProjectIdAndUserId(projectId, dto.getUserId())
                .ifPresent(m -> { throw new RuntimeException("User is already a member"); });

        ProjectMember member = ProjectMember.builder()
                .project(project)
                .userId(dto.getUserId())
                .build();
        projectMemberRepository.save(member);
    }

    @Override
    public void removeMember(Integer projectId, Integer userId) {
        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(projectId, userId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
        projectMemberRepository.delete(member);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> getMyProjects(Integer userId) {
        Set<Integer> projectIds = new HashSet<>();
        projectMemberRepository.findAll().stream()
                .filter(pm -> pm.getUserId().equals(userId))
                .forEach(pm -> projectIds.add(pm.getProject().getId()));
        projectRepository.findByManagerId(userId).forEach(p -> projectIds.add(p.getId()));

        if (projectIds.isEmpty()) {
            return List.of();
        }
        return projectRepository.findAllById(projectIds).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private ProjectDto mapToDto(Project project) {
        ProjectDto dto = new ProjectDto();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setManagerId(project.getManagerId());
        dto.setMembers(project.getMembers().stream().map(m -> {
            MemberDto md = new MemberDto();
            md.setId(m.getId());
            md.setUserId(m.getUserId());
            return md;
        }).collect(Collectors.toList()));
        return dto;
    }
}
