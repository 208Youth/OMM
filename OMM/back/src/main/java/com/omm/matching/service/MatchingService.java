package com.omm.matching.service;

import com.omm.exception.CustomException;
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

    /**
     * Topic 반환
     * @param receiverId
     * @return
     */
    public ChannelTopic getNotificationTopic(Long receiverId) {
        return matchingRepository.getNotificationTopic(receiverId);
    }

    /**
     * 알림 생성
     * @param receiverId
     * @return
     */
    public Notification createNotification(Long receiverId) {
        String id = UUID.randomUUID().toString();
        LocalDateTime createdTime = LocalDateTime.now();
        Notification notification = Notification.builder()
                .id(id)
                .senderId(getSender().getId())
                .createdTime(createdTime)
                .build();
        matchingRepository.createNotification(receiverId, notification);
        return notification;
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
