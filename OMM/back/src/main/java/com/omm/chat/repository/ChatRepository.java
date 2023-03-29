package com.omm.chat.repository;

import com.omm.chat.model.entity.ChatRoom;
import com.omm.chat.service.ChatSubscriberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class ChatRepository {
    private final RedisMessageListenerContainer redisMessageListenerContainer;
    private final ChatSubscriberService subscriberService;
    private static final String ROOMS = "Rooms";
    private final RedisTemplate redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;
    private Map<String, ChannelTopic> roomTopics;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        roomTopics = new HashMap<>();
        ChannelTopic topic = new ChannelTopic(ROOMS);
        roomTopics.put(ROOMS, topic);
        redisMessageListenerContainer.addMessageListener(subscriberService, topic);
    }

    /**
     * Rooms Topic 얻기
     * @return
     */
    public ChannelTopic getRoomTopic() {
        return roomTopics.get(ROOMS);
    }

    /**
     * 채팅방 CREATE
     * @param chatRoom
     */
    public void createRoom(ChatRoom chatRoom) {
        opsHashChatRoom.put(ROOMS, chatRoom.getId(), chatRoom);
    }
}
