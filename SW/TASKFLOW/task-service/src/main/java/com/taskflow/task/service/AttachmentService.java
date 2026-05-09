package com.taskflow.task.service;

import com.taskflow.task.dto.AttachmentDto;
import com.taskflow.task.entity.TaskAttachment;
import com.taskflow.task.entity.TaskItem;
import com.taskflow.task.kafka.KafkaProducerService;
import com.taskflow.task.repository.TaskAttachmentRepository;
import com.taskflow.task.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AttachmentService {

    private final TaskAttachmentRepository attachmentRepository;
    private final TaskRepository taskRepository;
    private final KafkaProducerService kafkaProducer;

    public AttachmentDto addAttachment(Integer taskId, String filePath, String fileName) {
        TaskItem task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        TaskAttachment attachment = TaskAttachment.builder()
                .filePath(filePath)
                .fileName(fileName)
                .task(task)
                .build();

        attachment = attachmentRepository.save(attachment);

        Map<String, Object> event = new HashMap<>();
        event.put("type", "ATTACHMENT_ADDED");
        event.put("taskId", taskId);
        event.put("attachmentId", attachment.getId());
        kafkaProducer.sendTaskEvent(event);

        return mapToDto(attachment);
    }

    @Transactional(readOnly = true)
    public List<AttachmentDto> getAttachmentsByTask(Integer taskId) {
        return attachmentRepository.findByTaskId(taskId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public void deleteAttachment(Integer attachmentId) {
        attachmentRepository.deleteById(attachmentId);
    }

    private AttachmentDto mapToDto(TaskAttachment attachment) {
        AttachmentDto dto = new AttachmentDto();
        dto.setId(attachment.getId());
        dto.setFilePath(attachment.getFilePath());
        dto.setFileName(attachment.getFileName());
        dto.setUploadedAt(attachment.getUploadedAt());
        return dto;
    }
}
