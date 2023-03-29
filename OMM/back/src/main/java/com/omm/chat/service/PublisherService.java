package com.omm.chat.service;

import com.omm.chat.model.entity.ChatRoom;
import com.omm.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PublisherService {
    private final RedisTemplate redisTemplate;

    /**
     * 채팅방 생성 이벤트 발신
     * @param topic
     * @param chatRoom
     */
    public void publishRoom(ChannelTopic topic, ChatRoom chatRoom) {
        redisTemplate.convertAndSend(topic.getTopic(), chatRoom);
    }
}
