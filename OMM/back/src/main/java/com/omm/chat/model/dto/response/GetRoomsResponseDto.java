package com.omm.chat.model.dto.response;

import com.omm.chat.model.dto.ChatRoomDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GetRoomsResponseDto {
    List<ChatRoomDto> list;
}
