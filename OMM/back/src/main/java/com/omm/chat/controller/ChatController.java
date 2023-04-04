package com.omm.chat.controller;

import com.omm.chat.model.dto.ChatRoomDto;
import com.omm.chat.model.dto.request.CreateRoomRequestDto;
import com.omm.chat.model.dto.request.CreateMessageRequestDto;
import com.omm.chat.model.dto.response.GetRoomsResponseDto;
import com.omm.chat.model.entity.ChatMessage;
import com.omm.chat.model.entity.ChatRoom;
import com.omm.chat.service.ChatService;
import com.omm.chat.service.ChatPublisherService;
import com.omm.jwt.TokenProvider;
import com.omm.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final TokenProvider tokenProvider;
    private final ChatService chatService;
    private final ChatPublisherService publishService;

    /**
     * 채팅방 생성 이벤트 수신
     * @param createRoomRequestDto
     */
    @MessageMapping("/chat/room")
    public void createRoom(StompHeaderAccessor accessor, CreateRoomRequestDto createRoomRequestDto) {
        String user = accessor.getUser().getName();
        ChatRoom chatRoom = chatService.createRoom(createRoomRequestDto, user);
        publishService.publishRoom(chatRoom);
    }

    @GetMapping("/chat/room")
    public ResponseEntity<?> getRooms() {
        List<ChatRoomDto> rooms = chatService.getRooms();
        return new ResponseEntity<>(new GetRoomsResponseDto(rooms), HttpStatus.OK);
    }

    @GetMapping("/chat/room/{room-id}")
    public ResponseEntity<?> getRoom(@PathVariable("room-id") String roomId) {
        return new ResponseEntity<>(chatService.getRoom(roomId), HttpStatus.OK);
    }

    @MessageMapping("/chat/room/{room-id}")
    public void createMessage(@DestinationVariable("room-id") String roomId, @Payload CreateMessageRequestDto messageDto, SimpMessageHeaderAccessor accessor) {
        String bearerToken = accessor.getFirstNativeHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            bearerToken = bearerToken.substring(7);
        }
        UserDetails details = (UserDetails) tokenProvider.getAuthentication(bearerToken).getPrincipal();
        String didAddress = details.getUsername();
        ChatMessage message = chatService.createMessage(messageDto, didAddress);
        publishService.publishMessage(message);
    }

    @PutMapping("/chat/room/{room-id}")
    public ResponseEntity<?> exitChatRoom(@PathVariable("room-id") String roomId) {
        chatService.exitChatRoom(roomId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
