package com.omm.chat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.omm.chat.model.dto.ChatRoomDto;
import com.omm.chat.model.dto.request.CreateMessageRequestDto;
import com.omm.chat.model.dto.request.CreateRoomRequestDto;
import com.omm.chat.model.dto.response.GetRoomResponseDto;
import com.omm.chat.model.entity.ChatMessage;
import com.omm.chat.model.entity.ChatRoom;
import com.omm.chat.repository.ChatRepository;
import com.omm.exception.CustomException;
import com.omm.model.entity.Member;
import com.omm.model.entity.MemberImg;
import com.omm.repository.MemberImgRepository;
import com.omm.repository.MemberRepository;
import com.omm.util.SecurityUtil;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
    private final MemberImgRepository memberImgRepository;
    private final ObjectMapper objectMapper;
    private Map<Long, String> sessionIdFromMemberId;
    private Map<String, String> roomIdFromSessionId;

    @PostConstruct
    private void init() {
        this.roomIdFromSessionId = new ConcurrentHashMap<>();
        this.sessionIdFromMemberId = new ConcurrentHashMap<>();
    }

    /**
     * 채팅방 생성
     * @param createRoomRequestDto
     * @return
     */
    public ChatRoom createRoom(CreateRoomRequestDto createRoomRequestDto, String user) {
        Long senderId = createRoomRequestDto.getSenderId();
        Set<Long> userIds = new HashSet<>();
        Member myInfo = getMember(user);
        userIds.add(myInfo.getId());
        userIds.add(senderId);
        ChatRoom chatRoom = new ChatRoom(userIds);
        chatRepository.createRoom(chatRoom);
        return chatRoom;
    }

    public List<ChatRoomDto> getRooms() {
        Member myInfo = getMember();
        Map<String, ChatRoom> rooms = chatRepository.getRooms();
        List<ChatRoomDto> myRooms = new ArrayList<>();
        for(Map.Entry<String, ChatRoom> entrySet : rooms.entrySet()) {
            ChatRoom room = entrySet.getValue();
            if(room.isMyRoom(myInfo.getId())) {
                ChatRoomDto chatRoomDto = getRoomDto(room, myInfo);
                myRooms.add(chatRoomDto);
            }
        }
        return myRooms;
    }

    public ChatRoomDto getRoom(String roomId) {
        Member myInfo = getMember();
        ChatRoom chatRoom = chatRepository.getRoom(roomId);
        return getRoomDto(chatRoom, myInfo);
    }

    public ChatRoomDto getRoomDto(ChatRoom room, Member myInfo) {
        ChatRoomDto chatRoomDto = new ChatRoomDto();
        chatRoomDto.setId(room.getId());
        chatRoomDto.setContent(room.getContent());
        chatRoomDto.setMsgs(room.getMsgs());
        chatRoomDto.setMyNotReadIndex(room.getLastReadIndex().get(myInfo.getId()));
        chatRoomDto.setLastMsgTime(room.getLastMsgTime());
        chatRoomDto.setOther(getOtherInfo(room.getUserIds(), myInfo, room));
        return chatRoomDto;
    }

    public Member getMember() {
        String didAddress = SecurityUtil.getCurrentDidAddress().get();
        return memberRepository.findByDidAddress(didAddress).orElseThrow(() -> {
            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        });
    }

    public Member getMember(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        });
    }

    public Member getMember(String user) {
        return memberRepository.findByDidAddress(user).orElseThrow(() -> {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        });
    }

    public MemberImg getImg(Long id) {
        List<MemberImg> memberImgs = memberImgRepository.findAllById(id);
        return memberImgs.isEmpty() ? null : memberImgs.get(0);
    }

    public Map<String, Object> getOtherInfo(Set<Long> userIds, Member myInfo, ChatRoom chatRoom) {
        Long[] ids = userIds.toArray(new Long[2]);
        Long otherId = myInfo.getId().longValue() == ids[0] ? ids[1] : ids[0];
        Member otherInfo = getMember(otherId);
        Map<String, Object> other = new HashMap<>();

        other.put("otherId", otherInfo.getId());
        other.put("nickname", otherInfo.getNickname());
        other.put("image", getImg(otherInfo.getId()));
        other.put("notReadIndex", chatRoom.getLastReadIndex().get(otherInfo.getId()));

        return other;
    }

    public ChatMessage createMessage(CreateMessageRequestDto messageDto, String user) {
        Member myInfo = getMember(user);
        ChatMessage message = new ChatMessage();
        Long id = chatRepository.getMessageSize(messageDto.getRoomId()) + 1;
        ChatRoom chatRoom = chatRepository.getRoom(message.getRoomId());

        message.setId(id);
        message.setRoomId(messageDto.getRoomId());
        message.setContent(messageDto.getContent());
        message.setCreatedTime(LocalDateTime.now());
        message.setSenderId(myInfo.getId());
        message.setReceiverId(messageDto.getReceiverId());
        message.setRead(false);
        /**
         * TODO : 상대방 연결 여부 확인
         */
        if(sessionIdFromMemberId.get(messageDto.getReceiverId()) != null) {
            String sessionId = sessionIdFromMemberId.get(messageDto.getReceiverId());
            if (roomIdFromSessionId.get(sessionId).equals(chatRoom.getId())) {
                message.setRead(true);
            }
        }

        return message;
    }

    public void connectUser(String roomId, String websocketSessionId, Long myId) {
        if(sessionIdFromMemberId.get(myId) != null) {
            roomIdFromSessionId.remove(sessionIdFromMemberId.get(myId));
        }
        roomIdFromSessionId.put(websocketSessionId, roomId);
        sessionIdFromMemberId.put(myId, websocketSessionId);
    }

    public void disconnectUser(String websocketSessionId, Long myId) {
        if(roomIdFromSessionId.get(websocketSessionId) != null) {
            roomIdFromSessionId.remove(websocketSessionId);
        }
        if(sessionIdFromMemberId.get(myId) != null) {
            sessionIdFromMemberId.remove(myId);
        }
    }

    public void enterRoom(String roomId, Long myId) {
        ChatRoom chatRoom = chatRepository.getRoom(roomId);
        Map<Long, Long> lastReadIndex = chatRoom.getLastReadIndex();
        Long msgSize = chatRepository.getMessageSize(roomId);
        lastReadIndex.put(myId, msgSize);
        chatRoom.setLastReadIndex(lastReadIndex);
        chatRepository.setRoom(chatRoom);
    }
}
