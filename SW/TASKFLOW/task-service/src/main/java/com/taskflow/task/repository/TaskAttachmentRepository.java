package com.taskflow.task.repository;

import com.taskflow.task.entity.TaskAttachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskAttachmentRepository extends JpaRepository<TaskAttachment, Integer> {

    List<TaskAttachment> findByTaskId(Integer taskId);
}
