package com.omm.chat.service;

import com.omm.chat.model.entity.ChatRoom;
import com.omm.exception.CustomException;
import com.omm.model.entity.Member;
import com.omm.repository.MemberRepository;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class ChatPublisherService {
    private final SimpMessagingTemplate messagingTemplate;
    private final MemberRepository memberRepository;

    /**
     * 채팅방 생성 이벤트 발신
     * @param chatRoom
     */
    public void publishRoom(ChatRoom chatRoom) {
        Set<Long> userIds = chatRoom.getUserIds();
        userIds.forEach(userId -> {
            String didAddress = getDidAddress(userId);
            messagingTemplate.convertAndSend("/sub/chat/room/" + didAddress, chatRoom);
        });
    }

    public String getDidAddress(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        });
        return member.getDidAddress();
    }
}
