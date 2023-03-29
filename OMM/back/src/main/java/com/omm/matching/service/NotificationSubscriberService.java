package com.omm.matching.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.omm.exception.CustomException;
import com.omm.matching.model.dto.response.NotificationResponseDto;
import com.omm.matching.model.entity.Notification;
import com.omm.model.entity.Member;
import com.omm.model.entity.MemberImg;
import com.omm.repository.MemberImgRepository;
import com.omm.repository.MemberRepository;
import com.omm.util.SecurityUtil;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class NotificationSubscriberService implements MessageListener {
    private final RedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messageTemplate;
    private final MemberRepository memberRepository;
    private final MemberImgRepository memberImgRepository;

    /**
     * 발행된 메세지 Notification 객체로 발행
     * @param message message must not be {@literal null}.
     * @param pattern pattern matching the channel (if specified) - can be {@literal null}.
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishedMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            Notification notification = objectMapper.readValue(publishedMessage, Notification.class);
            Member member = getMember();
            if(member.getId() == notification.getSenderId()) {
                messageTemplate.convertAndSend("/sub/matching/noti", getNotificationResponseDto(member, notification));
            }
        } catch(JsonProcessingException e) {
            throw new CustomException(ErrorCode.CANNOT_RESOLVE_MESSAGE);
        }
    }

    /**
     * 현재 사용자 정보 얻기
     * @return
     */
    public Member getMember() {
        String didAddress = SecurityUtil.getCurrentDidAddress().orElseThrow(() -> {
            throw new CustomException(ErrorCode.INVALID_AUTH_TOKEN);
        });
        return memberRepository.findByDidAddress(didAddress).orElseThrow(() -> {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        });
    }

    /**
     * Noficiation을 NotificationResponseDto로 반환
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
