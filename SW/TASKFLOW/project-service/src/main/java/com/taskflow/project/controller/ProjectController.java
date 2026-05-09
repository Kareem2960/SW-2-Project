package com.taskflow.project.controller;

import com.taskflow.project.dto.*;
import com.taskflow.project.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "Project management endpoints")
public class ProjectController {

    private final ProjectService projectService;

    @PostMapping
    @Operation(summary = "Create a new project")
    public ResponseEntity<ProjectDto> createProject(@Valid @RequestBody CreateProjectDto dto,
                                                     @AuthenticationPrincipal UserDetails userDetails) {
        Integer managerId = Integer.parseInt(userDetails.getUsername());
        return ResponseEntity.ok(projectService.createProject(dto, managerId));
    }

    @GetMapping
    @Operation(summary = "Get all projects")
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/my-projects")
    @Operation(summary = "Get current user's projects")
    public ResponseEntity<List<ProjectDto>> getMyProjects(@AuthenticationPrincipal UserDetails userDetails) {
        Integer userId = Integer.parseInt(userDetails.getUsername());
        return ResponseEntity.ok(projectService.getMyProjects(userId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get project by ID")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Integer id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update project")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable Integer id,
                                                       @Valid @RequestBody CreateProjectDto dto) {
        return ResponseEntity.ok(projectService.updateProject(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete project")
    public ResponseEntity<Void> deleteProject(@PathVariable Integer id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{projectId}/members")
    @Operation(summary = "Add member to project")
    public ResponseEntity<Void> addMember(@PathVariable Integer projectId,
                                             @Valid @RequestBody AddMemberDto dto) {
        projectService.addMember(projectId, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{projectId}/members/{userId}")
    @Operation(summary = "Remove member from project")
    public ResponseEntity<Void> removeMember(@PathVariable Integer projectId,
                                               @PathVariable Integer userId) {
        projectService.removeMember(projectId, userId);
        return ResponseEntity.ok().build();
    }
}
