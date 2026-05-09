package com.taskflow.notification.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(nullable = false, length = 500)
    private String message;

    @Column(nullable = false, length = 100)
    private String type; // TaskAssigned, TaskStatusUpdated, ProjectCreated, etc.

    @Column(name = "is_read")
    @Builder.Default
    private Boolean isRead = false;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "related_entity_type", length = 100)
    private String relatedEntityType; // Task, Project, etc.

    @Column(name = "related_entity_id")
    private Integer relatedEntityId;
}
