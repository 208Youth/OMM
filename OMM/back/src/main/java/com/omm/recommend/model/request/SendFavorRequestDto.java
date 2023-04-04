package com.omm.recommend.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class SendFavorRequestDto {

    @JsonProperty(value = "sender_id")
    private Long senderId;

    @JsonProperty(value = "favor")
    private boolean favor;
}
