package com.omm.matching.service;

import com.omm.matching.model.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationPublisherService {
    private final RedisTemplate redisTemplate;

    /**
     * 알림 이벤트 발행
     * @param topic
     * @param notification
     */
    public void publishNotification(ChannelTopic topic, Notification notification) {
        redisTemplate.convertAndSend(topic.getTopic(), notification);
    }
}
