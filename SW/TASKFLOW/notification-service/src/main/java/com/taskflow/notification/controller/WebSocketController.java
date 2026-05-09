package com.taskflow.notification.controller;

import com.taskflow.notification.dto.NotificationDto;
import com.taskflow.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {

    private final NotificationService notificationService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/notifications/send")
    @SendTo("/topic/notifications")
    public NotificationDto sendNotification(@Payload NotificationDto notification) {
        log.info("Sending notification: {}", notification);
        return notification;
    }

    public void sendNotificationToUser(Integer userId, NotificationDto notification) {
        log.info("Sending notification to user {}: {}", userId, notification);
        messagingTemplate.convertAndSend("/topic/user/" + userId + "/notifications", notification);
    }

    @MessageMapping("/notifications/mark-read")
    public void markNotificationAsRead(@Payload Integer notificationId) {
        log.info("Marking notification {} as read", notificationId);
        notificationService.markAsRead(notificationId);
    }
}
