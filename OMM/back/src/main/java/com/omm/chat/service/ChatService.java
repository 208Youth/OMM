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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {
    private final ChatRepository chatRepository;
    private final MemberRepository memberRepository;
    private final MemberImgRepository memberImgRepository;
    private final ObjectMapper objectMapper;
    private HashMap<String, Long> sessionidWithUserId = new HashMap<>();
    private HashMap<Long, String> userIdWithSessionId = new HashMap<>();
    private HashMap<String, String> sessionidWithChatroomId = new HashMap<>();

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

    public GetRoomResponseDto getRoom(String roomId) {
        Member myInfo = getMember();
        ChatRoom chatRoom = chatRepository.getRoom(roomId);
        List<ChatMessage> messages = chatRepository.getMessages(roomId);
        List<ChatMessage> chatMessages = new ArrayList<>();
        for(Object messageObject : messages) {
            ChatMessage message = objectMapper.convertValue(messageObject, ChatMessage.class);
            chatMessages.add(message);
        }
        return new GetRoomResponseDto(getRoomDto(chatRoom, myInfo), chatMessages);
    }

    public ChatRoomDto getRoomDto(ChatRoom room, Member myInfo) {
        ChatRoomDto chatRoomDto = new ChatRoomDto();
        chatRoomDto.setId(room.getId());
        chatRoomDto.setContent(room.getContent());
        chatRoomDto.setMsgs(room.getMsgs());
        chatRoomDto.setMyNotReadIndex(room.getLastReadIndex().get(myInfo.getId()));
        chatRoomDto.setLastMsgTime(room.getLastMsgTime());
        chatRoomDto.setOther(getOtherInfo(room.getUserIds(), myInfo, room));
        chatRoomDto.setMyLastSendIndex(room.getLastSendIndex().get(myInfo.getId()));
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

    public MemberImg getImg(Member member) {
        List<MemberImg> memberImgs = memberImgRepository.findAllByMember(member);
        return memberImgs.isEmpty() ? null : memberImgs.get(0);
    }

    public Map<String, Object> getOtherInfo(Set<Long> userIds, Member myInfo, ChatRoom chatRoom) {
        Long[] ids = userIds.toArray(new Long[2]);
        Long otherId = myInfo.getId().longValue() == ids[0] ? ids[1] : ids[0];
        Member otherInfo = getMember(otherId);
        Map<String, Object> other = new HashMap<>();

        other.put("otherId", otherInfo.getId());
        other.put("nickname", otherInfo.getNickname());
        if(getImg(otherInfo) == null) {
            other.put("image", null);
        }
        else {
            other.put("image", getImg(otherInfo).getImageContent());
        }
        other.put("notReadIndex", chatRoom.getLastReadIndex().get(otherInfo.getId()));

        return other;
    }

    public ChatMessage createMessage(CreateMessageRequestDto messageDto, String user) {
        Member myInfo = getMember(user);
        ChatMessage message = new ChatMessage();
        Long id = chatRepository.getMessageSize(messageDto.getRoomId()) + 1;

        ChatRoom chatRoom = chatRepository.getRoom(messageDto.getRoomId());
        chatRoom.setMsgs(id);
        chatRoom.setContent(messageDto.getContent());

        Map<Long, Long> lastReadIndex = chatRoom.getLastReadIndex();
        lastReadIndex.put(myInfo.getId(), id);

        Map<Long, Long> lastSendIndex = chatRoom.getLastSendIndex();
        lastSendIndex.put(myInfo.getId(), id);

        LocalDateTime nowTime = LocalDateTime.now();
        chatRoom.setLastMsgTime(nowTime);

        message.setId(id);
        message.setRoomId(messageDto.getRoomId());
        message.setContent(messageDto.getContent());
        message.setCreatedTime(nowTime);
        message.setSenderId(myInfo.getId());
        message.setReceiverId(messageDto.getReceiverId());
        message.setRead(false);

        Map<String, Object> otherInfo = getOtherInfo(chatRoom.getUserIds(), myInfo, chatRoom);
        Long otherId = (Long) otherInfo.get("otherId");
        String sessionId = userIdWithSessionId.get(otherId);
        if(sessionId != null && sessionidWithChatroomId.get(sessionId) != null) {
            if(sessionidWithChatroomId.get(sessionId).equals(messageDto.getRoomId())) {
                message.setRead(true);
                lastReadIndex.put(otherId, id);
            }
        }

        chatRoom.setLastReadIndex(lastReadIndex);
        chatRoom.setLastSendIndex(lastSendIndex);
        chatRepository.setRoom(chatRoom);
        chatRepository.saveMessage(message);
        return message;
    }

    public void connectUser(String roomId, String websocketSessionId, Long myId) {
        sessionidWithChatroomId.put(websocketSessionId, roomId);
        sessionidWithUserId.put(websocketSessionId, myId);
        userIdWithSessionId.put(myId, websocketSessionId);
    }

    public void disconnectUser(String key) {
        String chatroomId = sessionidWithChatroomId.get(key);
        if (chatroomId == null) {
            log.error(" have to exist but not sessionId=" + key + " userId=" + sessionidWithUserId.get(key));
        } else {
            Long userId = sessionidWithUserId.get(key);
            if (userId == null) log.error("no user found");
            else {
                ChatRoom chatRoom = chatRepository.getRoom(chatroomId);
                Map<Long, Long> lastReadIndex = chatRoom.getLastReadIndex();
                lastReadIndex.put(userId, chatRoom.getMsgs());
                chatRepository.setRoom(chatRoom);

                log.debug("remove the user from Redis joining members because of disconnection");
                userIdWithSessionId.remove(userId);
            }
        }
        sessionidWithUserId.remove(key);
        sessionidWithChatroomId.remove(key);
    }

    public ChatRoom enterRoom(String roomId, Long myId) {
        ChatRoom chatRoom = chatRepository.getRoom(roomId);
        Map<Long, Long> lastReadIndex = chatRoom.getLastReadIndex();
        Long msgSize = chatRepository.getMessageSize(roomId);
        lastReadIndex.put(myId, msgSize);
        chatRoom.setLastReadIndex(lastReadIndex);
        chatRepository.setRoom(chatRoom);
        return chatRoom;
    }

    public void exitChatRoom(String roomId) {
        chatRepository.deleteRoom(roomId);
    }
}
