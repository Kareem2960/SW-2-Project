package com.taskflow.project.config;

import com.taskflow.project.entity.Project;
import com.taskflow.project.entity.ProjectMember;
import com.taskflow.project.repository.ProjectMemberRepository;
import com.taskflow.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ProjectDemoDataSeeder implements CommandLineRunner {

    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    @Value("${taskflow.demo.seed-enabled:true}")
    private boolean seedEnabled;

    @Value("${taskflow.demo.manager-user-id:2}")
    private int demoManagerUserId;

    @Value("${taskflow.demo.member-user-id:3}")
    private int demoMemberUserId;

    @Override
    @Transactional
    public void run(String... args) {
        if (!seedEnabled || projectRepository.count() > 0) {
            return;
        }

        Project p = Project.builder()
                .name("FlowMaster — Demo Project")
                .managerId(demoManagerUserId)
                .build();
        p = projectRepository.save(p);

        addMemberOnce(p.getId(), demoManagerUserId);
        addMemberOnce(p.getId(), demoMemberUserId);
        addMemberOnce(p.getId(), 1);
    }

    private void addMemberOnce(Integer projectId, Integer userId) {
        if (projectMemberRepository.findByProjectIdAndUserId(projectId, userId).isEmpty()) {
            Project project = projectRepository.findById(projectId).orElseThrow();
            projectMemberRepository.save(ProjectMember.builder()
                    .project(project)
                    .userId(userId)
                    .build());
        }
    }
}
