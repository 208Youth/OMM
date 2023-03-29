package com.omm.matching.model.entity;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class Notification {
    private String id;
    private Long senderId;
    private LocalDateTime createdTime;
}
