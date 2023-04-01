package com.omm.chat.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@NoArgsConstructor
@Data
public class ChatRoomDto {
    private String id;
    private Long msgs;
    private LocalDateTime lastMsgTime;
    private String content;
    private Map<String, Object> other;
    private Long myNotReadIndex;
}
