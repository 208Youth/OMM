package com.omm.matching.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class GetNotificationsResponseDto {
    @JsonProperty(value = "list")
    List<NotificationResponseDto> list;
}
