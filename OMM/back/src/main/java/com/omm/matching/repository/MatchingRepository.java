package com.omm.matching.repository;

import com.omm.matching.model.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

@Repository
@RequiredArgsConstructor
public class MatchingRepository {
    private static final String TOPIC = "Topic";
    private final RedisTemplate redisTemplate;
    private ListOperations<Long, Notification> opsListNotification;
    private HashOperations<String, Long, ChannelTopic> opsHashTopic;
    @PostConstruct
    private void init() {
        opsListNotification = redisTemplate.opsForList();
        opsHashTopic = redisTemplate.opsForHash();
    }

    /**
     * Topic 조회
     * @param receiverId
     * @return
     */
    public ChannelTopic getNotificationTopic(Long receiverId) {
        ChannelTopic channelTopic = opsHashTopic.get(TOPIC, receiverId);
        if(channelTopic == null) {
            String memberIdStr = receiverId.toString();
            ChannelTopic newTopic = new ChannelTopic(memberIdStr);
            opsHashTopic.put(TOPIC, receiverId, newTopic);
            channelTopic = newTopic;
        }
        return channelTopic;
    }

    /**
     * 알림 생성
     * @param receiverId
     * @param notification
     */
    public void createNotification(Long receiverId, Notification notification) {
        opsListNotification.leftPush(receiverId, notification);
    }
}
