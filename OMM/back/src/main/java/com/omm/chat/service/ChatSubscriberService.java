package com.omm.chat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.omm.chat.model.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatSubscriberService implements MessageListener {
    private final RedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messageTemplate;

    /**
     * 이벤트 수신
     * Subscriber에게 이벤트 트리거
     * @param message message must not be {@literal null}.
     * @param pattern pattern matching the channel (if specified) - can be {@literal null}.
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        String publishedMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
        ChatRoom chatRoom = getChatRoom(publishedMessage);

        if(chatRoom != null) {
            sendRoom(chatRoom);
        }
    }

    /**
     * 이벤트로 전달된 ChatRoom 객체 반환
     * @param publishedMessage
     * @return
     */
    public ChatRoom getChatRoom(String publishedMessage) {
        try {
            return objectMapper.readValue(publishedMessage, ChatRoom.class);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    /**
     * Subscriber에게 채팅방 반환
     * @param chatRoom
     */
    public void sendRoom(ChatRoom chatRoom) {
        messageTemplate.convertAndSend("/sub/chat/room", chatRoom);
    }
}
