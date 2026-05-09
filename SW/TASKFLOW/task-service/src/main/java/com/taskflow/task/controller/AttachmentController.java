package com.taskflow.task.controller;

import com.taskflow.task.dto.AttachmentDto;
import com.taskflow.task.service.AttachmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tasks/{taskId}/attachments")
@RequiredArgsConstructor
@Tag(name = "Attachments", description = "Task attachment endpoints")
public class AttachmentController {

    private final AttachmentService attachmentService;
    private final Path uploadPath = Paths.get("uploads");

    @PostMapping
    @Operation(summary = "Upload attachment to task")
    public ResponseEntity<AttachmentDto> uploadAttachment(@PathVariable Integer taskId,
                                                          @RequestParam("file") MultipartFile file) throws IOException {
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        return ResponseEntity.ok(attachmentService.addAttachment(taskId, filePath.toString(), file.getOriginalFilename()));
    }

    @GetMapping
    @Operation(summary = "Get attachments for task")
    public ResponseEntity<List<AttachmentDto>> getAttachments(@PathVariable Integer taskId) {
        return ResponseEntity.ok(attachmentService.getAttachmentsByTask(taskId));
    }

    @DeleteMapping("/{attachmentId}")
    @Operation(summary = "Delete attachment")
    public ResponseEntity<Void> deleteAttachment(@PathVariable Integer attachmentId) {
        attachmentService.deleteAttachment(attachmentId);
        return ResponseEntity.ok().build();
    }
}
