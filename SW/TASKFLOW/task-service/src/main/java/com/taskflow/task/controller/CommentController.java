package com.taskflow.task.controller;

import com.taskflow.task.dto.AddCommentDto;
import com.taskflow.task.dto.CommentDto;
import com.taskflow.task.service.CommentService;
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
@RequestMapping("/api/tasks/{taskId}/comments")
@RequiredArgsConstructor
@Tag(name = "Comments", description = "Task comment endpoints")
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    @Operation(summary = "Add comment to task")
    public ResponseEntity<CommentDto> addComment(@PathVariable Integer taskId,
                                                  @Valid @RequestBody AddCommentDto dto,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        Integer userId = Integer.parseInt(userDetails.getUsername());
        return ResponseEntity.ok(commentService.addComment(taskId, dto.getContent(), userId));
    }

    @GetMapping
    @Operation(summary = "Get comments for task")
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable Integer taskId) {
        return ResponseEntity.ok(commentService.getCommentsByTask(taskId));
    }

    @DeleteMapping("/{commentId}")
    @Operation(summary = "Delete comment")
    public ResponseEntity<Void> deleteComment(@PathVariable Integer commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}
