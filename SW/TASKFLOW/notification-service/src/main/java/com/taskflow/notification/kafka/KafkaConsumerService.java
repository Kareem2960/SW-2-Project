package com.taskflow.notification.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskflow.notification.dto.CreateNotificationDto;
import com.taskflow.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaConsumerService {

    private final NotificationService notificationService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "task-events", groupId = "notification-service-group")
    public void consumeTaskEvents(String message) {
        try {
            Map<String, Object> event = objectMapper.readValue(message, Map.class);
            String type = (String) event.get("type");

            switch (type) {
                case "TASK_ASSIGNED" -> {
                    Integer taskId = (Integer) event.get("taskId");
                    Integer assignedTo = (Integer) event.get("assignedTo");

                    CreateNotificationDto dto = new CreateNotificationDto();
                    dto.setUserId(assignedTo);
                    dto.setMessage("You have been assigned to task #" + taskId);
                    dto.setType("TASK_ASSIGNED");
                    dto.setRelatedEntityType("Task");
                    dto.setRelatedEntityId(taskId);
                    notificationService.createNotification(dto);
                    log.info("Created notification for task assignment: {}", taskId);
                }
                case "TASK_CREATED" -> {
                    // Could notify project members
                    log.info("Task created event received: {}", event.get("taskId"));
                }
            }
        } catch (Exception e) {
            log.error("Failed to process task event", e);
        }
    }

    @KafkaListener(topics = "notification-events", groupId = "notification-service-group")
    public void consumeNotificationEvents(String message) {
        try {
            Map<String, Object> event = objectMapper.readValue(message, Map.class);
            log.info("Received notification event: {}", event);
        } catch (Exception e) {
            log.error("Failed to process notification event", e);
        }
    }
}
