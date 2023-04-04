package com.omm.chat.service;

import com.google.gson.JsonObject;
import com.omm.admin.model.response.GetEntraceResponseDto;
import com.omm.chat.model.dto.ChatRoomDto;
import com.omm.chat.model.dto.response.GetRoomResponseDto;
import com.omm.chat.model.entity.ChatMessage;
import com.omm.chat.model.entity.ChatRoom;
import com.omm.exception.CustomException;
import com.omm.model.entity.Member;
import com.omm.model.entity.MemberImg;
import com.omm.repository.MemberImgRepository;
import com.omm.repository.MemberRepository;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ChatPublisherService {
    private final SimpMessagingTemplate messagingTemplate;
    private final MemberRepository memberRepository;
    private final MemberImgRepository memberImgRepository;

    /**
     * 채팅방 생성 이벤트 발신
     * @param chatRoom
     */
    public void publishRoom(ChatRoom chatRoom) {
        Set<Long> userIds = chatRoom.getUserIds();
        Long[] ids = userIds.toArray(new Long[2]);
        Member[] members = new Member[2];
        members[0] = getMember(ids[0]);
        members[1] = getMember(ids[1]);

        ChatRoomDto chatRoomDto = new ChatRoomDto();
        chatRoomDto.setId(chatRoom.getId());
        chatRoomDto.setMsgs(chatRoom.getMsgs());
        chatRoomDto.setContent(chatRoom.getContent());
        chatRoomDto.setLastMsgTime(chatRoom.getLastMsgTime());

        for(int i = 0; i < 2; i++) {
            Map<String, Object> other = new HashMap<>();
            int otherIndex = getOtherIndex(i);
            Member otherInfo = members[otherIndex];
            Member myInfo = members[i];
            other.put("otherId", otherInfo.getId());
            other.put("nickname", otherInfo.getNickname());
            other.put("image", getImg(otherInfo.getId()));
            other.put("notReadIndex", chatRoom.getLastReadIndex().get(otherInfo.getId()));

            chatRoomDto.setOther(other);
            chatRoomDto.setMyNotReadIndex(chatRoom.getLastReadIndex().get(myInfo.getId()));

            messagingTemplate.convertAndSend("/sub/chat/room/" + myInfo.getDidAddress(), chatRoomDto);
        }
    }

    public Member getMember(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        });
    }

    public int getOtherIndex(int myIndex) {
        return myIndex == 0 ? 1 : 0;
    }

    public MemberImg getImg(Long id) {
        List<MemberImg> memberImgs = memberImgRepository.findAllById(id);
        return memberImgs.isEmpty() ? null : memberImgs.get(0);
    }

    public void publishMessage(ChatMessage message) {
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }

    public void publishEnter(String roomId, GetRoomResponseDto message) {
        messagingTemplate.convertAndSend("/sub/chat/room/" + roomId + "/entrance", message);
    }
}
