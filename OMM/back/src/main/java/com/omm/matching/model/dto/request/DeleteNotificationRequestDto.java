package com.omm.matching.model.dto.request;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class DeleteNotificationRequestDto {
    private String id;
    private Long senderId;
    private LocalDateTime createdTime;
}
