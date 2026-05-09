package com.taskflow.task.repository;

import com.taskflow.task.entity.TaskItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskItem, Integer> {

    List<TaskItem> findByProjectId(Integer projectId);

    List<TaskItem> findByAssignedUserId(Integer assignedUserId);

    List<TaskItem> findByStatus(String status);

    long countByProjectId(Integer projectId);
}
