package com.omm.matching.service;

import com.omm.matching.model.entity.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationPublisherService {
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * 알림 이벤트 발행
     * @param receiverAddr
     * @param notification
     */
    public void publishNotification(String receiverAddr, Notification notification) {
        messagingTemplate.convertAndSend("/sub/matching/noti/" + receiverAddr, notification);
    }
}
