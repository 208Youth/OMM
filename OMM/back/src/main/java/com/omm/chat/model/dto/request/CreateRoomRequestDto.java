package com.omm.chat.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateRoomRequestDto {
    private Long senderId;
}
