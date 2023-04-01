package com.omm.matching.model.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
public class NotificationResponseDto {
    private String id;
    private Map<String, Object> sender;
    private LocalDateTime createdTime;
}
