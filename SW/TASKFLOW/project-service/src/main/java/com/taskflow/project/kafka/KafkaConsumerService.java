package com.taskflow.project.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaConsumerService {

    @KafkaListener(topics = "task-events", groupId = "project-service-group")
    public void consumeTaskEvents(String message) {
        log.info("Received task event: {}", message);
    }

    @KafkaListener(topics = "user-events", groupId = "project-service-group")
    public void consumeUserEvents(String message) {
        log.info("Received user event: {}", message);
    }
}
