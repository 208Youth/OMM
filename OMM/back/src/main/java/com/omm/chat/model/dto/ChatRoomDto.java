package com.omm.chat.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
import java.util.Set;

@Builder
@Data
public class ChatRoomDto {
    private String id;
    private Set<Long> userIds;
    private Map<Long, Long> lastReadIndex;
    private Long msgs;
    private String content;
}
