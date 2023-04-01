package com.omm.matching.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateNotificationRequestDto implements Serializable {
    private Long receiverId;
}
