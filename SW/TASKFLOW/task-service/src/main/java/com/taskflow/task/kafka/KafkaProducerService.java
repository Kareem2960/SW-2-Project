package com.taskflow.task.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public void sendTaskEvent(Map<String, Object> event) {
        try {
            String message = objectMapper.writeValueAsString(event);
            kafkaTemplate.send("task-events", message);
            log.info("Sent task event: {}", message);
        } catch (Exception e) {
            log.error("Failed to send task event", e);
        }
    }

    public void sendNotificationEvent(Map<String, Object> event) {
        try {
            String message = objectMapper.writeValueAsString(event);
            kafkaTemplate.send("notification-events", message);
            log.info("Sent notification event: {}", message);
        } catch (Exception e) {
            log.error("Failed to send notification event", e);
        }
    }
}
