package com.omm.chat.model.dto.response;

import com.omm.chat.model.dto.ChatRoomDto;
import com.omm.chat.model.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GetRoomsResponseDto {
    List<ChatRoomDto> list;
}