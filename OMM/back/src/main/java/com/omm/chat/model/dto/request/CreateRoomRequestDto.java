package com.omm.chat.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRoomRequestDto implements Serializable {
    private Long senderId;
}
