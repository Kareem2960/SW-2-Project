package com.taskflow.task.service;

import com.taskflow.task.dto.CommentDto;
import com.taskflow.task.entity.TaskComment;
import com.taskflow.task.entity.TaskItem;
import com.taskflow.task.repository.TaskCommentRepository;
import com.taskflow.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final TaskCommentRepository commentRepository;
    private final TaskRepository taskRepository;

    public CommentDto addComment(Integer taskId, String content, Integer userId) {
        TaskItem task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        TaskComment comment = TaskComment.builder()
                .content(content)
                .userId(userId)
                .task(task)
                .build();

        comment = commentRepository.save(comment);
        return mapToDto(comment);
    }

    @Transactional(readOnly = true)
    public List<CommentDto> getCommentsByTask(Integer taskId) {
        return commentRepository.findByTaskId(taskId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public void deleteComment(Integer commentId) {
        commentRepository.deleteById(commentId);
    }

    private CommentDto mapToDto(TaskComment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setUserId(comment.getUserId());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }
}
