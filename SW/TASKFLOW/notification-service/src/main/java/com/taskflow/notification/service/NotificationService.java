package com.taskflow.notification.service;

import com.taskflow.notification.dto.*;
import com.taskflow.notification.entity.Notification;
import com.taskflow.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationDto createNotification(CreateNotificationDto dto) {
        Notification notification = Notification.builder()
                .userId(dto.getUserId())
                .message(dto.getMessage())
                .type(dto.getType())
                .relatedEntityType(dto.getRelatedEntityType())
                .relatedEntityId(dto.getRelatedEntityId())
                .isRead(false)
                .build();

        return mapToDto(notificationRepository.save(notification));
    }

    @Transactional(readOnly = true)
    public List<NotificationDto> getUserNotifications(Integer userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<NotificationDto> getUnreadNotifications(Integer userId) {
        return notificationRepository.findByUserIdAndIsReadFalse(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public long getUnreadCount(Integer userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    public NotificationDto markAsRead(Integer notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setIsRead(true);
        return mapToDto(notificationRepository.save(notification));
    }

    public void markAllAsRead(Integer userId) {
        List<Notification> unread = notificationRepository.findByUserIdAndIsReadFalse(userId);
        unread.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(unread);
    }

    public void deleteNotification(Integer notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    private NotificationDto mapToDto(Notification notification) {
        NotificationDto dto = new NotificationDto();
        dto.setId(notification.getId());
        dto.setUserId(notification.getUserId());
        dto.setMessage(notification.getMessage());
        dto.setType(notification.getType());
        dto.setIsRead(notification.getIsRead());
        dto.setCreatedAt(notification.getCreatedAt());
        dto.setRelatedEntityType(notification.getRelatedEntityType());
        dto.setRelatedEntityId(notification.getRelatedEntityId());
        return dto;
    }
}
