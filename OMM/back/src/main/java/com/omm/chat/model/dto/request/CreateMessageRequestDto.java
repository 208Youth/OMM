package com.omm.chat.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateMessageRequestDto implements Serializable {
    private String roomId;
    private String content;
    private Long receiverId;
}
