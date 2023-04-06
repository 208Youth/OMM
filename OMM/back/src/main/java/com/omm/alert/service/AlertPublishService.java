package com.omm.alert.service;

import com.omm.alert.model.dto.response.AlertResponseDto;
import com.omm.chat.repository.ChatRepository;
import com.omm.exception.CustomException;
import com.omm.matching.repository.MatchingRepository;
import com.omm.model.entity.Member;
import com.omm.repository.MemberRepository;
import com.omm.util.SecurityUtil;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlertPublishService {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRepository chatRepository;
    private final MatchingRepository matchingRepository;
    private final MemberRepository memberRepository;
    public void publishChatAlert(Member member) {
        String didAddress = member.getDidAddress();
        AlertResponseDto alertResponseDto = new AlertResponseDto(isChatAlertExist(member));
        messagingTemplate.convertAndSend("/sub/matching/chatalert/" + didAddress, alertResponseDto);
        messagingTemplate.convertAndSend("/sub/chat/chatalert/" + didAddress, alertResponseDto);
    }

    public void publishNotiAlert(Member member) {
        String didAddress = member.getDidAddress();
        AlertResponseDto alertResponseDto = new AlertResponseDto(isNotiAlertExist(member));
        messagingTemplate.convertAndSend("/sub/matching/notialert/" + didAddress, alertResponseDto);
        messagingTemplate.convertAndSend("/sub/chat/notialert/" + didAddress, alertResponseDto);
    }

    /**
     * Member의 채팅 존재 여부
     * @param member
     */
    public boolean isChatAlertExist(Member member) {
        return chatRepository.findAllAlert(member.getId());
    }

    /**
     * Member의 알림 존재 여부
     * @param member
     */
    public boolean isNotiAlertExist(Member member) {
        return matchingRepository.findAllAlert(member.getId());
    }

    public Member getMember() {
        String didAddress = SecurityUtil.getCurrentDidAddress().get();
        return memberRepository.findByDidAddress(didAddress).orElseThrow(() -> {
            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        });
    }
}
