package com.omm.matching.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.omm.exception.CustomException;
import com.omm.matching.model.dto.request.DeleteNotificationRequestDto;
import com.omm.matching.model.dto.response.NotificationResponseDto;
import com.omm.matching.model.entity.Notification;
import com.omm.matching.repository.MatchingRepository;
import com.omm.model.entity.Member;
import com.omm.model.entity.MemberImg;
import com.omm.repository.MemberImgRepository;
import com.omm.repository.MemberRepository;
import com.omm.util.SecurityUtil;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MatchingService {
    private final MatchingRepository matchingRepository;
    private final MemberRepository memberRepository;
    private final MemberImgRepository memberImgRepository;
    private final ObjectMapper objectMapper;

    /**
     * Topic 반환
     * @param receiverId
     * @return
     */
    public String getReceiverAddr(Long receiverId) {
        return matchingRepository.getReceiverAddr(receiverId);
    }

    /**
     * 알림 생성
     * @param receiverId
     * @return
     */
    public Notification createNotification(Long receiverId, String user) {
        String id = UUID.randomUUID().toString();
        LocalDateTime createdTime = LocalDateTime.now();
        Notification notification = Notification.builder()
                .id(id)
                .senderId(getSender(user).getId())
                .createdTime(createdTime)
                .build();
        matchingRepository.createNotification(receiverId, notification);
        return notification;
    }

    /**
     * 알림 목록 반환
     * @return
     */
    public List<NotificationResponseDto> getNotifications() {
        Member member = getSender();
        List<NotificationResponseDto> notificationResponseDtos = new ArrayList<>();
        List<Notification> notifications = matchingRepository.getNotifications(member.getId());
        for(Object notificationObject : notifications) {
            Notification notification = objectMapper.convertValue(notificationObject, Notification.class);
            notificationResponseDtos.add(getNotificationResponseDto(member, notification));
        }
        return notificationResponseDtos;
    }

    /**
     * 알림 삭제
     * @param deleteNotificationRequestDto
     */
    public void deleteNotification(DeleteNotificationRequestDto deleteNotificationRequestDto) {
        Notification notification = Notification.builder()
                .id(deleteNotificationRequestDto.getId())
                .senderId(deleteNotificationRequestDto.getSenderId())
                .createdTime(deleteNotificationRequestDto.getCreatedTime())
                .build();
        Member member = getSender();
        matchingRepository.deleteNotification(member.getId(), notification);
    }

    /**
     * 로그인한 사용자 객체 반환
     * @return
     */
    public Member getSender() {
        String didAddress = SecurityUtil.getCurrentDidAddress().orElseThrow(() -> {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        });
        return memberRepository.findByDidAddress(didAddress).orElseThrow(() -> {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        });
    }

    public Member getSender(String user) {
        return memberRepository.findByDidAddress(user).orElseThrow(() -> {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        });
    }

    /**
     * Notification을 NotificationResponseDto로 반환
     * @param member
     * @param notification
     * @return
     */
    public NotificationResponseDto getNotificationResponseDto(Member member, Notification notification) {
        List<MemberImg> memberImgs = memberImgRepository.findAllById(member.getId());
        MemberImg profileImg = memberImgs.isEmpty() ? null : memberImgs.get(0);

        Map<String, Object> sender = new HashMap<>();
        sender.put("memberId", member.getId());
        sender.put("nickname", member.getNickname());
        sender.put("imageContent", profileImg);


        return NotificationResponseDto.builder()
                .id(notification.getId())
                .sender(sender)
                .createdTime(notification.getCreatedTime())
                .build();
    }
}
