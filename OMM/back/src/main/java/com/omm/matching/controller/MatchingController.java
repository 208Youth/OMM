package com.omm.matching.controller;

import com.omm.matching.model.dto.request.CreateNotificationRequestDto;
import com.omm.matching.model.entity.Notification;
import com.omm.matching.service.MatchingService;
import com.omm.matching.service.NotificationPublisherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MatchingController {
    private final MatchingService matchingService;
    private final NotificationPublisherService publisherService;

    /**
     * 알림 생성
     * @param createNotificationRequestDto
     */
    @MessageMapping("/matching/noti")
    public void createNotification(@RequestBody CreateNotificationRequestDto createNotificationRequestDto) {
        Notification notification = matchingService.createNotification(createNotificationRequestDto.getReceiverId());
        ChannelTopic topic = matchingService.getNotificationTopic(createNotificationRequestDto.getReceiverId());
        publisherService.publishNotification(topic, notification);
    }

}
