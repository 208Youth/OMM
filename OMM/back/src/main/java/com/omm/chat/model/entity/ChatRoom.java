package com.omm.chat.model.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Data
@RedisHash("Rooms")
public class ChatRoom implements Serializable {
    @Id
    private String id;
    private Set<Long> userIds;
    private Map<Long, Long> lastReadIndex;
    private Long msgs;
    private String content;

    private static final String START_MSG = "채팅을 시작해주세요!";

    public ChatRoom(Set<Long> userIds) {
        this.id = UUID.randomUUID().toString();
        this.userIds = userIds;
        this.lastReadIndex = new HashMap<>();
        userIds.forEach(userId -> {
            lastReadIndex.put(userId, 0L);
        });
        this.msgs = 0L;
        this.content = START_MSG;
    }
}
