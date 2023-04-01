package com.omm.chat.controller;

import com.omm.chat.model.dto.ChatRoomDto;
import com.omm.chat.model.dto.request.CreateRoomRequestDto;
import com.omm.chat.model.dto.response.GetRoomsResponseDto;
import com.omm.chat.model.entity.ChatRoom;
import com.omm.chat.service.ChatService;
import com.omm.chat.service.ChatPublisherService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final ChatPublisherService publishService;

    /**
     * 채팅방 생성 이벤트 수신
     * @param createRoomRequestDto
     */
    @MessageMapping("/chat/room")
    public void createRoom(CreateRoomRequestDto createRoomRequestDto) {
        ChatRoom chatRoom = chatService.createRoom(createRoomRequestDto);
        ChannelTopic topic = chatService.getRoomTopic();
        publishService.publishRoom(topic, chatRoom);
    }

    @GetMapping("/chat/room")
    public ResponseEntity<?> getRooms() {
        List<ChatRoomDto> rooms = chatService.getRooms();
        return new ResponseEntity<>(new GetRoomsResponseDto(rooms), HttpStatus.OK);
    }
}
