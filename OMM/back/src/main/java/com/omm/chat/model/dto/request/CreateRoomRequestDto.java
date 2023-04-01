package com.omm.chat.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@Getter
@AllArgsConstructor
public class CreateRoomRequestDto implements Serializable {
    private Long senderId;
}
