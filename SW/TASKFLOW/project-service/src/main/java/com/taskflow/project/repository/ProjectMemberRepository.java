package com.taskflow.project.repository;

import com.taskflow.project.entity.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Integer> {

    List<ProjectMember> findByProjectId(Integer projectId);

    Optional<ProjectMember> findByProjectIdAndUserId(Integer projectId, Integer userId);

    long countByUserId(Integer userId);
}
