package com.omm.matching.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class GetNotificationsResponseDto {
    List<NotificationResponseDto> list;
}
