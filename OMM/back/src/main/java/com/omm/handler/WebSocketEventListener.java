package com.omm.handler;

import com.google.gson.JsonObject;
import com.omm.chat.model.dto.ChatRoomDto;
import com.omm.chat.model.dto.response.GetRoomResponseDto;
import com.omm.chat.model.entity.ChatRoom;
import com.omm.chat.service.ChatPublisherService;
import com.omm.chat.service.ChatService;
import com.omm.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.messaging.support.NativeMessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
    private final TokenProvider jwtTokenProvider;

    private final ChatService chatService;
    private final ChatPublisherService publisherService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        MessageHeaderAccessor accessor = NativeMessageHeaderAccessor.getAccessor(event.getMessage(), SimpMessageHeaderAccessor.class);
        GenericMessage generic = (GenericMessage) accessor.getHeader("simpConnectMessage");
        Map nativeHeaders = (Map) generic.getHeaders().get("nativeHeaders");
        System.out.println(nativeHeaders.get("roomId"));
        String roomId = nativeHeaders.get("roomId") == null ? "" : (String) ((List) nativeHeaders.get("roomId")).get(0);
        Long myId = 0L;
        String authorizationHeader = (String) ((List) nativeHeaders.get("Authorization")).get(0);
        if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7);
            if (jwtTokenProvider.validateToken(jwt)) {
                Authentication authentication = jwtTokenProvider.getAuthentication(jwt);
                String user = authentication.getName();
                myId = chatService.getMember(user).getId();
                if (!roomId.equals("")) {
                    String sessionId = (String) generic.getHeaders().get("simpSessionId");
                    logger.info("[Connected] room id : {} | websocket session id : {}", roomId, sessionId);
                    chatService.connectUser(roomId, sessionId, myId);
                    ChatRoom chatRoom = chatService.enterRoom(roomId, myId);
                    GetRoomResponseDto chatRoomDto = chatService.getRoom(roomId);
                    publisherService.publishEnter(roomId, chatRoomDto);
                }
            }
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        logger.info("[Disconnected] websocket session id : {}", sessionId);

        chatService.disconnectUser(sessionId);
    }
}
