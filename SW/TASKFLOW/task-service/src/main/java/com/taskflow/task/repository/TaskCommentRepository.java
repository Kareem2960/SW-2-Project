package com.taskflow.task.repository;

import com.taskflow.task.entity.TaskComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskCommentRepository extends JpaRepository<TaskComment, Integer> {

    List<TaskComment> findByTaskId(Integer taskId);
}
