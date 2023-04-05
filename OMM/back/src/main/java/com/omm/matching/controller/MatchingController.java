package com.omm.matching.controller;

import com.omm.matching.model.dto.request.CreateNotificationRequestDto;
import com.omm.matching.model.dto.request.DeleteNotificationRequestDto;
import com.omm.matching.model.dto.response.GetNotificationsResponseDto;
import com.omm.matching.model.dto.response.NotificationResponseDto;
import com.omm.matching.model.entity.Notification;
import com.omm.matching.service.MatchingService;
import com.omm.matching.service.NotificationPublisherService;
import com.omm.model.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public void createNotification(StompHeaderAccessor accessor, CreateNotificationRequestDto createNotificationRequestDto) {
        String user = accessor.getUser().getName();
        Notification notification = matchingService.createNotification(createNotificationRequestDto.getReceiverId(), user);
        String receiverAddr = matchingService.getReceiverAddr(createNotificationRequestDto.getReceiverId());
        Member sender = matchingService.getSender(user);
        System.out.println("Controller [SENDER_ID] : " + sender.getId());
        NotificationResponseDto notificationResponseDto = matchingService.getNotificationResponseDto(sender, notification);
        publisherService.publishNotification(receiverAddr, notificationResponseDto);
    }

    /**
     * 알림 목록 조회
     * @return
     */
    @GetMapping("/matching/noti")
    public ResponseEntity<?> getNotifications() {
        List<NotificationResponseDto> notifications = matchingService.getNotifications();
        return new ResponseEntity<>(new GetNotificationsResponseDto(notifications), HttpStatus.OK);
    }

    /**
     * 알림 삭제
     * @param deleteNotificationRequestDto
     * @return
     */
    @DeleteMapping("/matching/noti")
    public ResponseEntity<?> deleteNotification(@RequestBody DeleteNotificationRequestDto deleteNotificationRequestDto) {
        matchingService.deleteNotification(deleteNotificationRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
